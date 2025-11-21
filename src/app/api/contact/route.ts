
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminApp } from '@/lib/firebase-admin';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

export const runtime = 'nodejs';

// Zod schema for input validation
const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9),
  email: z.string().email(),
  address: z.string().optional(),
  token: z.string().min(1, { message: 'reCAPTCHA token je povinný.' }),
});

// Cache the reCAPTCHA client for better performance
let recaptchaClient: RecaptchaEnterpriseServiceClient | null = null;
function getRecaptchaClient() {
  if (!recaptchaClient) {
    recaptchaClient = new RecaptchaEnterpriseServiceClient();
  }
  return recaptchaClient;
}


async function createAssessment({
  projectID,
  recaptchaKey,
  token,
  recaptchaAction,
}: {
  projectID: string,
  recaptchaKey: string,
  token: string,
  recaptchaAction: string
}) {
  const client = getRecaptchaClient();
  const projectPath = client.projectPath(projectID);

  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  };

  const [response] = await client.createAssessment(request);

  if (!response.tokenProperties?.valid) {
    console.error(`reCAPTCHA token is invalid: ${response.tokenProperties?.invalidReason}`);
    throw new Error(`The CreateAssessment call failed because the token was: ${response.tokenProperties?.invalidReason}`);
  }

  if (response.tokenProperties.action !== recaptchaAction) {
     console.error(`reCAPTCHA action mismatch. Expected: ${recaptchaAction}, Got: ${response.tokenProperties.action}`);
    throw new Error(`The action attribute in your reCAPTCHA tag does not match the action you are expecting to score.`);
  }
  
  // Return the risk analysis
  return response.riskAnalysis;
}

export async function POST(request: Request) {
  const adminApp = getAdminApp();
  const db = adminApp?.firestore();

  if (!db) {
    return NextResponse.json({ message: 'Internal Server Error: Firestore not initialized.' }, { status: 500 });
  }

  const projectID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!projectID || !recaptchaKey) {
     return NextResponse.json({ message: 'Server configuration error: Missing environment variables.' }, { status: 500 });
  }

  try {
    const json = await request.json();
    const { token, ...formData } = contactSchema.parse(json);

    // Create a reCAPTCHA assessment
    const riskAnalysis = await createAssessment({
      projectID,
      recaptchaKey,
      token,
      recaptchaAction: 'CONTACT_FORM_SUBMIT',
    });

    // We can be stricter here, e.g., score < 0.5. For this use case, 0.7 is a good starting point.
    const score = riskAnalysis?.score ?? 0;
    if (!riskAnalysis || score < 0.7) {
      console.warn(`reCAPTCHA verification failed or low score: ${score}`);
      // Do not reveal the score to the client.
      return NextResponse.json({ message: 'reCAPTCHA verification failed. Please try again.' }, { status: 400 });
    }

    console.log(`reCAPTCHA assessment passed with score: ${score}`);

    // If verification is successful, save data to Firestore
    const submissionsCollection = db.collection('contact_submissions');
    await submissionsCollection.add({
      ...formData,
      submittedAt: new Date().toISOString(),
      recaptchaScore: score,
    });

    return NextResponse.json({ message: 'Submission successful!' });

  } catch (error: any) {
    console.error('API Contact Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid data provided', errors: error.errors }, { status: 400 });
    }
    // Return a generic error message to the client
    return NextResponse.json({ message: 'An unexpected error occurred. Please try again later.' }, { status: 500 });
  }
}
