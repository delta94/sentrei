/* eslint-disable @typescript-eslint/no-explicit-any */

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import getProfileChanges from "@sentrei/functions/helpers/getProfileChanges";

const updateGroupProfile = async (
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  collectionGroup: string,
  uid: string,
): Promise<boolean> => {
  const profileData = getProfileChanges(change);

  if (!profileData) {
    return false;
  }

  const ref = await admin
    .firestore()
    .collection(collectionGroup)
    .where("uid", "==", uid)
    .get();
  const promises: any[] = [];

  ref.docs.forEach(doc => {
    promises.push(doc.ref.update(profileData));
  });

  await Promise.all(promises);

  return true;
};

export default updateGroupProfile;
