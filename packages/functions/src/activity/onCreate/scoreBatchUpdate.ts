/* eslint-disable @typescript-eslint/no-explicit-any */

import * as functions from "firebase-functions";

import scoreActions from "@sentrei/functions/helpers/scoreActions";
import scoreUpdate from "@sentrei/functions/helpers/scoreUpdate";
import Activity from "@sentrei/types/models/Activity";

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

    return scoreUpdate(data, score, data.createdByUid);
  });

export default scoreBatchUpdate;
