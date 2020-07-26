import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Profile from "@sentrei/types/models/Profile";
import Username from "@sentrei/types/models/Username";

const db = admin.firestore();

/**
 * Update profile on create
 */
const profileUpdate = functions.firestore
  .document("usernames/{usernameId}")
  .onCreate(snap => {
    const data = snap.data() as Username;
    return db
      .doc(`profiles/${data.uid}`)
      .update(<Profile.Update>{username: snap.id});
  });

export default profileUpdate;
