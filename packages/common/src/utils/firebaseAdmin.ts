import * as admin from "firebase-admin";

const firebaseAdminConfig = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

if (!admin.apps.length) {
  admin.initializeApp(firebaseAdminConfig);
}

// eslint-disable-next-line import/prefer-default-export
export const adminDb = admin.firestore();
