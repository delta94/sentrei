import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Member from "@sentrei/types/models/Member";
import Status from "@sentrei/types/models/Status";

const db = admin.firestore();

/**
 * Update status from members
 */
const memberStatusUpdate = functions.database
  .ref("/status/{uid}")
  .onUpdate(async (change, context) => {
    const {uid} = context.params;
    const eventStatus = change.after.val() as Status;

    const items = await db
      .collectionGroup("members")
      .where("uid", "==", uid)
      .get();

    const memberUpdate: Member.Update = {
      status: eventStatus.status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedBy: eventStatus.profile,
      updatedByUid: uid,
    };

    const promises = items.docs.map(doc => doc.ref.update(memberUpdate));
    return Promise.all(promises);
  });

export default memberStatusUpdate;
