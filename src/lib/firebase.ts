import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from '@/lib/firebase-config';

let app: FirebaseApp;
let firestore: Firestore;
let auth: Auth;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

firestore = getFirestore(app);
auth = getAuth(app);


export { app, firestore, auth };
