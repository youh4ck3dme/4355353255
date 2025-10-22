
import admin, { App } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let app: App;

export async function initializeFirebaseAdmin() {
    if (admin.apps.length > 0) {
        app = admin.apps[0]!;
    } else {
         app = admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });
    }
    
    const firestore = getFirestore(app);
    const auth = getAuth(app);

    return { app, firestore, auth };
}
