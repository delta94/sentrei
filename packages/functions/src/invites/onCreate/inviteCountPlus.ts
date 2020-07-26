import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Increase invite count to arbitrary collection
 */
const inviteCountPlus = functions.firestore
  .document("spaces/{spaceId}/invites/{inviteId}")
  .onCreate((_, context) => {
    const {spaceId} = context.params;
    return db.doc(`spaces/${spaceId}`).update(<Space.AdminUpdate>{
      inviteCount: admin.firestore.FieldValue.increment(1),
    });
  });

export default inviteCountPlus;
