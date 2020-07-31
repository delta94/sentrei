import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();

/**
 * Delete leaderboard for user
 */
const spaceLeaderboardDelete = functions.firestore
  .document("spaces/{spaceId}/members/{memberId}")
  .onDelete(async (_, context) => {
    const {spaceId, memberId} = context.params;
    return db.doc(`spaces/${spaceId}/leaderboard/${memberId}`).delete();
  });

export default spaceLeaderboardDelete;
