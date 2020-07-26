import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@sentrei/types/models/Activity";
import Metadata from "@sentrei/types/models/Metadata";

const db = admin.firestore();

/**
 * Batch set activity for spaces
 */
const activityBatchSet = functions.firestore
  .document("activity/{activityId}")
  .onCreate((snap, context) => {
    const {activityId} = context.params;
    const data = snap.data() as Activity.Response;

    if (data.action === "deleted" && data.category === "spaces") {
      return false;
    }

    const batch = db.batch();

    const spaceData: Metadata.Update = {
      updatedAt: data.updatedAt,
      updatedBy: data.user,
      updatedByUid: data.createdByUid,
    };

    const spaceRef = db.doc(`spaces/${data.spaceId}`);
    batch.set(spaceRef, spaceData, {merge: true});

    const spaceActivityRef = db.doc(
      `spaces/${data.spaceId}/activity/${activityId}`,
    );
    batch.set(spaceActivityRef, data);

    return batch.commit();
  });

export default activityBatchSet;
