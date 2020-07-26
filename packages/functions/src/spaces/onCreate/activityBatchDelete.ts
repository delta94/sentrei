import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();

/**
 * Delete old activity on create
 */
const activityBatchDelete = functions.firestore
  .document("spaces/{spaceId}")
  .onCreate(async (snap, context) => {
    const {spaceId} = context.params;

    const batch = db.batch();

    const list = await db
      .collection("activity")
      .where("category", "==", "spaces")
      .where("categoryId", "==", spaceId)
      .get();

    const old = list.docs.filter(item => item.id !== snap.id);

    old.forEach(doc => {
      batch.delete(doc.ref);
    });

    return batch.commit();
  });

export default activityBatchDelete;
