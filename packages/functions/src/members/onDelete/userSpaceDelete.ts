import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();

/**
 * Delete space for user
 */
const userSpaceDelete = functions.firestore
  .document("spaces/{spaceId}/members/{userId}")
  .onDelete((_, context) => {
    const {spaceId, userId} = context.params;
    return db.doc(`users/${userId}/spaces/${spaceId}`).delete();
  });

export default userSpaceDelete;
