import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();

/**
 * Delete leaderboard for user
 */
const spaceLeaderboardDelete = functions.firestore
  .document("spaces/{spaceId}/members/{userId}")
  .onDelete(async (_, context) => {
    const {spaceId, userId} = context.params;
    return db.doc(`spaces/${spaceId}/leaderboard/${userId}`).delete();
  });

export default spaceLeaderboardDelete;
