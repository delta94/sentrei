import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import {getProfileChanges} from "@sentrei/functions/helpers";
import Profile from "@sentrei/types/models/Profile";

const db = admin.firestore();

const memberProfileUpdate = functions.firestore
  .document("profiles/{id}")
  .onUpdate(async change => {
    const oldData = change.before.data() as Profile.Response;
    const oldUsername = oldData.username;
    const profileData = getProfileChanges(change);

    if (!profileData) {
      return false;
    }

    const items = await db
      .collectionGroup("members")
      .where("username", "==", oldUsername)
      .get();

    const promises = items.docs.map(doc => doc.ref.update(profileData));
    return Promise.all(promises);
  });

export default memberProfileUpdate;
