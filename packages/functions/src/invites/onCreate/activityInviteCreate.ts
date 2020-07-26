import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@sentrei/types/models/Activity";
import Invite from "@sentrei/types/models/Invite";

const db = admin.firestore();

/**
 * Create invite activity on create
 */
const activityInviteCreate = functions.firestore
  .document("{collection}/{docId}/invites/{userId}")
  .onCreate((snap, context) => {
    const {collection, docId, inviteId} = context.params;

    const data = snap.data() as Invite.Response;

    const activity: Activity.CreateInvite = {
      action: "created",
      before: null,
      after: data,
      category: "invites",
      categoryId: inviteId,
      createdByUid: data.createdByUid,
      fullItemPath: `${collection}/${docId}/invites/${inviteId}`,
      itemPath: `invites/${inviteId}`,
      updatedAt: data.updatedAt,
      spaceId: data.spaceId,
      user: data.updatedBy,
      userNotification: [],
    };

    return db.collection("activity").add(activity);
  });

export default activityInviteCreate;
