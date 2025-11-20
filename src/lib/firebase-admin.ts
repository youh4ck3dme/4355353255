
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
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    // The private key needs newlines to be correctly parsed
    privateKey: (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  };

  // Check if essential service account details are present
  if (!serviceAccount.projectId || !service.Account.clientEmail || !serviceAccount.privateKey) {
      throw new Error("Firebase Admin SDK environment variables are not set. Check PROJECT_ID, CLIENT_EMAIL, and PRIVATE_KEY.");
  }

  // Initialize the app with the credentials
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`
  });

  return app;
};
