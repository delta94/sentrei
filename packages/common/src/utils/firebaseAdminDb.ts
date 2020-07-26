import * as admin from "firebase-admin";

const firebaseAdminConfig = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function firebaseAdminDb() {
  try {
    return admin.firestore();
  } catch (error) {
    admin.initializeApp(firebaseAdminConfig);
    return admin.firestore();
  }
}
