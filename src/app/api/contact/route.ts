
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

// Cache the reCAPTCHA client
const recaptchaClient = new RecaptchaEnterpriseServiceClient();

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
  const projectPath = recaptchaClient.projectPath(projectID);

  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  };

  const [response] = await recaptchaClient.createAssessment(request);

  if (!response.tokenProperties?.valid) {
    throw new Error(`The CreateAssessment call failed because the token was: ${response.tokenProperties?.invalidReason}`);
  }

  if (response.tokenProperties.action !== recaptchaAction) {
    throw new Error(`The action attribute in your reCAPTCHA tag does not match the action you are expecting to score. Expected: ${recaptchaAction}, Got: ${response.tokenProperties.action}`);
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

  const projectID = process.env.FIREBASE_PROJECT_ID;
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

    // Check the score. A lower score indicates lower risk.
    // We can be stricter here, e.g. score < 0.5
    if (!riskAnalysis || (riskAnalysis.score ?? 0) < 0.7) {
      console.warn(`reCAPTCHA verification failed or low score: ${riskAnalysis?.score}`);
      return NextResponse.json({ message: 'reCAPTCHA verification failed. Please try again.' }, { status: 400 });
    }

    console.log(`reCAPTCHA score: ${riskAnalysis.score}`);

    // If verification is successful, save data to Firestore
    const submissionsCollection = db.collection('contact_submissions');
    await submissionsCollection.add({
      ...formData,
      submittedAt: new Date().toISOString(),
      recaptchaScore: riskAnalysis.score,
    });

    return NextResponse.json({ message: 'Submission successful!' });

  } catch (error: any) {
    console.error('API Contact Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid data provided', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: error.message || 'An unknown error occurred.' }, { status: 500 });
  }
}
