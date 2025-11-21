
import * as admin from 'firebase-admin';

let app: admin.app.App;

function initializeAdminApp(): admin.app.App {
  if (admin.apps.length > 0 && admin.apps[0]) {
    return admin.apps[0];
  }

  const serviceAccount: admin.ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY! || '').replace(/\\n/g, '\n'),
  };

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`
  });
}

function getAdminApp(): admin.app.App {
    if (!app) {
        app = initializeAdminApp();
    }
    return app;
}

export const adminApp = getAdminApp();
export const db = adminApp.firestore();
export const auth = adminApp.auth();
