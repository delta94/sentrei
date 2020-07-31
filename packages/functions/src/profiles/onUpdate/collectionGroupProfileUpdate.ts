import * as functions from "firebase-functions";

import getProfileChanges from "@sentrei/functions/helpers/getProfileChanges";
import updateGroupProfile from "@sentrei/functions/helpers/updateGroupProfile";

const collectionGroupProfileUpdate = functions.firestore
  .document("profiles/{profileId}")
  .onUpdate(async (change, context) => {
    const {profileId} = context.params;

    const profileData = getProfileChanges(change);

    if (!profileData) {
      return false;
    }

    const collections = ["members", "leaderboard"];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises: any[] = [];

    collections.forEach(item => {
      promises.push(updateGroupProfile(change, item, profileId));
    });

    return Promise.all(promises);
  });

export default collectionGroupProfileUpdate;
