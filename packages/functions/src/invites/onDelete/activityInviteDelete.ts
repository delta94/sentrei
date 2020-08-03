import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import {timestamp} from "@sentrei/common/utils/firebase";
import Activity from "@sentrei/types/models/Activity";
import Invite from "@sentrei/types/models/Invite";

const db = admin.firestore();
/**
 * Create invite activity on delete
 */
const activityInviteDelete = functions.firestore
  .document("{collection}/{docId}/invites/{inviteId}")
  .onDelete((snap, context) => {
    const {collection, docId, inviteId} = context.params;

    const data = snap.data() as Invite.Response;

    const activity: Activity.DeleteInvite = {
      action: "deleted",
      before: data,
      after: null,
      category: "invites",
      categoryId: inviteId,
      createdByUid: data.createdByUid,
      fullItemPath: `${collection}/${docId}/invites/${inviteId}`,
      itemPath: `invites/${inviteId}`,
      updatedAt: timestamp,
      spaceId: data.spaceId,
      user: data.updatedBy,
      userNotification: [],
    };

    return db.collection("activity").add(activity);
  });

export default activityInviteDelete;
