
import * as admin from 'firebase-admin';

// A single instance of the app, to avoid re-initializing
let app: admin.app.App;

/**
 * Initializes the Firebase Admin SDK if it hasn't been already.
 * This function is safe to call multiple times.
 * @returns The initialized Firebase Admin App instance.
 */
function initializeAdminApp(): admin.app.App {
  // If an app is already initialized, return it.
  if (admin.apps.length > 0 && admin.apps[0]) {
    return admin.apps[0];
  }

  // Otherwise, initialize a new one.
  const serviceAccount: admin.ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    // Replace escaped newlines with actual newlines for the private key
    privateKey: (process.env.FIREBASE_PRIVATE_KEY! || '').replace(/\\n/g, '\n'),
  };

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`
  });
}

/**
 * Gets the singleton instance of the Firebase Admin App.
 * Initializes the app if it's not already initialized.
 * @returns The Firebase Admin App instance.
 */
export function getAdminApp(): admin.app.App {
    if (!app) {
        app = initializeAdminApp();
    }
    return app;
}

// Export pre-initialized services for convenience
export const adminApp = getAdminApp();
export const db = adminApp.firestore();
export const auth = adminApp.auth();
