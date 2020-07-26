import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Actions from "@sentrei/types/models/Actions";
import Activity from "@sentrei/types/models/Activity";

const db = admin.firestore();

/**
 * Add actions and category to activity
 */
const actionCategorySet = functions.firestore
  .document("activity/{activityId}")
  .onCreate(snap => {
    const data = snap.data() as Activity.Response;
    const action = `${data.action}_${data.category}`;
    const update: Actions = {
      [action]: admin.firestore.FieldValue.increment(1),
    };

    return db.doc(`actions/${data.createdByUid}`).set(update, {merge: true});
  });

export default actionCategorySet;
