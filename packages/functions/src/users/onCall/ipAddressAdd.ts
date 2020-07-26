import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();

/**
 * Log IP Address on call
 */
const ipAddressAdd = functions.https.onCall(async (_, context) => {
  const uid = context.auth?.uid;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {ip, ips} = context.rawRequest as any;

  if (!uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You need to be logged in to continue.",
    );
  }

  const reqData = {
    ip,
    ips,
    visited: admin.firestore.FieldValue.serverTimestamp(),
  };
  const ref = await db.collection(`users/${uid}/ipAddress`).add(reqData);

  return {id: ref.id};
});

export default ipAddressAdd;
