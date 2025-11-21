import * as admin from 'firebase-admin';

// Function to safely get the initialized admin app
export const getAdminApp = () => {
  // If the app is already initialized, return it
  if (admin.apps.length > 0 && admin.apps[0]) {
    return admin.apps[0];
  }

  // Construct the service account object from environment variables
  // This is a more secure practice than using a JSON file directly
  const serviceAccount: admin.ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // The private key needs newlines to be correctly parsed
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  };

  // Check if essential service account details are present
  if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
      throw new Error("Firebase Admin SDK environment variables are not set. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.");
  }

  // Initialize the app with the credentials
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`
  });

  return app;
};
