
import * as admin from 'firebase-admin';

// A single instance of the app, to avoid re-initializing
let app: admin.app.App | null = null;

/**
 * Gets the singleton instance of the Firebase Admin App.
 * Initializes the app if it's not already initialized.
 * @returns The Firebase Admin App instance or null if initialization fails.
 */
export function getAdminApp(): admin.app.App | null {
  if (app) {
    return app;
  }

  // Check for existing initialized apps
  if (admin.apps.length > 0 && admin.apps[0]) {
    app = admin.apps[0];
    return app;
  }

  // Validate environment variables
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.error('Firebase Admin SDK ERROR: Missing environment variables (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY). SDK will not be initialized.');
    return null;
  }

  try {
    const serviceAccount: admin.ServiceAccount = {
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, '\n'),
    };

    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`
    });

    return app;
  } catch (error) {
    console.error('Firebase Admin SDK ERROR: Failed to initialize.', error);
    return null;
  }
}

// Export pre-initialized services for convenience, can be null
export const adminApp = getAdminApp();
export const db = adminApp ? adminApp.firestore() : null;
export const auth = adminApp ? adminApp.auth() : null;
