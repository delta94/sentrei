import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import {getProfileChanges} from "@sentrei/functions/helpers";

const db = admin.firestore();

const leaderboardProfileUpdate = functions.firestore
  .document("profiles/{profileId}")
  .onUpdate(async (change, context) => {
    const {profileId} = context.params;

    const profileData = getProfileChanges(change);

    if (!profileData) {
      return false;
    }

    const items = await db
      .collectionGroup("leaderboard")
      .where("uid", "==", profileId)
      .get();

    const promises = items.docs.map(doc => doc.ref.update(profileData));
    return Promise.all(promises);
  });

export default leaderboardProfileUpdate;
