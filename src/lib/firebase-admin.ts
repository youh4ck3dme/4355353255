
import * as admin from 'firebase-admin';

const serviceAccount = {
  projectId: process.env.PROJECT_ID || 'studio-6196097112-43509',
  clientEmail: process.env.CLIENT_EMAIL || 'firebase-adminsdk-vcspr@studio-6196097112-43509.iam.gserviceaccount.com',
  privateKey: (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n'),
};

export const initializeAdminApp = async () => {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`,
  });

  return app;
};
