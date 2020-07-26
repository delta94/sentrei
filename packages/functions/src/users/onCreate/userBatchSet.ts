import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import getNameFromEmail from "@sentrei/functions/helpers/getNameFromEmail";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import Username from "@sentrei/types/models/Username";

const db = admin.firestore();

/**
 * Setup profile on user create
 */
const userBatchSet = functions.auth.user().onCreate(async user => {
  const batch = db.batch();

  const usernameData: Username = {
    uid: user.uid,
  };

  const profileData: Profile.Response = {
    name: user.displayName || getNameFromEmail(user.email || user.uid),
    photo: user.photoURL || null,
    username: user.uid,
  };

  const userData: User.Response = {
    ...profileData,
    email: user.email,
    role: "viewer",
    notificationCount: 0,
    notificationSettings: {
      chat: ["app", "email"],
      invitation: ["app", "email"],
      update: ["app", "email"],
    },
  };

  const usernameRef = db.doc(`usernames/${user.uid}`);
  batch.set(usernameRef, usernameData, {merge: true});

  const userRef = db.doc(`users/${user.uid}`);
  batch.set(userRef, userData, {merge: true});

  const profileRef = db.doc(`profiles/${user.uid}`);
  batch.set(profileRef, profileData, {merge: true});

  return batch.commit();
});

export default userBatchSet;
