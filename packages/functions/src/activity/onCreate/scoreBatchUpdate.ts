/* eslint-disable @typescript-eslint/no-explicit-any */
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import scoreActions from "@sentrei/functions/helpers/scoreActions";
import Activity from "@sentrei/types/models/Activity";
import Leaderboard from "@sentrei/types/models/Leaderboard";

const db = admin.firestore();

/**
 * Batch update scores for each activity
 */
const scoreBatchUpdate = functions.firestore
  .document("activity/{activityId}")
  .onCreate(snap => {
    const data = snap.data() as Activity.Response;
    const isAuthor = data.createdByUid === data.before?.createdByUid;
    const scoreAction = `${data.action}_${data.category}`;
    let score: number = (scoreActions as any)[scoreAction] || 1;

    if (data.action === "deleted") {
      if (data.category === "spaces") {
        return false;
      }
      if (isAuthor) {
        score = -(scoreActions as any)[`created_${data.category}`] || -1;
      }
    }

    const batch = db.batch();
    const scoreField = admin.firestore.FieldValue.increment(score || 1);
    const userId = data.createdByUid;

    const newData: Leaderboard.Response = {
      ...data.user,
      createdByUid: userId,
      score: scoreField,
    };

    const ref = db.doc(`spaces/${data.spaceId}/leaderboard/${userId}`);
    batch.set(ref, newData, {merge: true});

    return batch.commit();
  });

export default scoreBatchUpdate;
