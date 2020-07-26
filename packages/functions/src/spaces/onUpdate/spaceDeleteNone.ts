import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Delete a space if memberCount is zero
 */
const spaceDeleteNone = functions.firestore
  .document("spaces/{spaceId}")
  .onUpdate(async (change, context) => {
    const {spaceId} = context.params;
    const {memberCount} = change.after.data() as Space.Response;
    if (memberCount === 0) {
      return db.doc(`spaces/${spaceId}`).delete();
    }
    return false;
  });

export default spaceDeleteNone;
