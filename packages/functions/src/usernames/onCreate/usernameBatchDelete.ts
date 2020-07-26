import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Username from "@sentrei/types/models/Username";

const db = admin.firestore();

/**
 * Delete old usernames on create
 */
const usernameBatchDelete = functions.firestore
  .document("usernames/{usernameId}")
  .onCreate(async snap => {
    const data = snap.data() as Username;
    const batch = db.batch();

    const list = await db
      .collection("usernames")
      .where("uid", "==", data.uid)
      .get();

    const old = list.docs.filter(item => item.id !== snap.id);

    old.forEach(doc => {
      batch.delete(doc.ref);
    });

    return batch.commit();
  });

export default usernameBatchDelete;
