import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Decrease invite count to arbitrary collection
 */
const inviteCountMinus = functions.firestore
  .document("spaces/{spaceId}/invites/{inviteId}")
  .onDelete((_, context) => {
    const {spaceId} = context.params;
    return db.doc(`spaces/${spaceId}`).update(<Space.AdminUpdate>{
      inviteCount: admin.firestore.FieldValue.increment(-1),
    });
  });

export default inviteCountMinus;
