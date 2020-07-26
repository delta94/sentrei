import * as admin from "firebase-admin";

import Activity from "@sentrei/types/models/Activity";

export type ContentTypes = Activity.Response;

interface LeaderboardData {
  createdByUid: string;
  score: admin.firestore.FieldValue;
}

const scoreUpdate = (
  data: ContentTypes,
  score?: number,
  user?: string,
): Promise<FirebaseFirestore.WriteResult[]> => {
  const db = admin.firestore();
  const batch = db.batch();
  const scoreField = admin.firestore.FieldValue.increment(score || 1);

  const userId = user || data.createdByUid;

  const newData: LeaderboardData = {
    createdByUid: userId,
    score: scoreField,
  };

  const topicRef = db.doc(`spaces/${data.spaceId}/leaderboard/${userId}`);
  batch.set(topicRef, newData, {merge: true});

  return batch.commit();
};

export default scoreUpdate;
