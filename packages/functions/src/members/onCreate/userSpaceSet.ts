import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Set space for user
 */
const userSpaceSet = functions.firestore
  .document("spaces/{spaceId}/members/{userId}")
  .onCreate(async (snap, context) => {
    const {spaceId, userId} = context.params;
    const doc = await db.doc(`spaces/${spaceId}`).get();
    const data = doc.data() as Space.Response;

    return db.doc(`users/${userId}/spaces/${spaceId}`).set(data);
  });

export default userSpaceSet;
