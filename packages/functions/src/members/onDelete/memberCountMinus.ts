import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Decrease member count to arbitrary collection
 */
const memberCountMinus = functions.firestore
  .document("{collection}/{docId}/members/{memberId}")
  .onDelete((_, context) => {
    const {collection, docId} = context.params;
    return db.doc(`${collection}/${docId}`).update(<Space.AdminUpdate>{
      memberCount: admin.firestore.FieldValue.increment(-1),
    });
  });

export default memberCountMinus;
