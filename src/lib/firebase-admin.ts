import * as admin from 'firebase-admin';

let app: admin.app.App | null = null;

export const getAdminApp = () => {
  if (app) {
    return app;
  }

  if (admin.apps.length > 0 && admin.apps[0]) {
    app = admin.apps[0];
    return app;
  }

  try {
    const serviceAccount: admin.ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    };

    if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
        app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`
        });
        return app;
    }
  } catch (error) {
      console.error("Firebase Admin SDK initialization failed:", error);
  }

  return null;
};
