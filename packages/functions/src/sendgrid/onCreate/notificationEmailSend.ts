import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import mailClient, {contentTemplate} from "@sentrei/functions/helpers/sendGrid";

import Email from "@sentrei/types/models/Email";
import Notification from "@sentrei/types/models/Notification";
import User from "@sentrei/types/models/User";

const db = admin.firestore();

const notificationEmailSend = functions.firestore
  .document("users/{userId}/notifications/{notificationId}")
  .onCreate(async (snap, context) => {
    const {userId} = context.params;
    const data = snap.data() as Notification.Response;

    const user = await db.doc(`users/${userId}`).get();
    const userData = user.data() as User.Response;

    const isEnabled = userData.notificationSettings[data.type].includes(
      "email",
    );

    if (!isEnabled || !userData.email) return false;

    const templateData: Notification.Email = {
      editId: data.activityId || data.itemPath,
      name: data.user.name,
      username: userData.username,
    };

    const templateId = contentTemplate;

    const msg: Email = {
      to: userData.email,
      from: "support@sentrei.com",
      templateId: templateId[userData?.language || "en"],
      dynamic_template_data: templateData,
    };

    return mailClient.send(msg);
  });

export default notificationEmailSend;
