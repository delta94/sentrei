import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import MailClient from "@sentrei/functions/helpers/sendgrid/MailClient";
import UpdateEmail from "@sentrei/functions/helpers/sendgrid/UpdateEmail";

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

    const email = new UpdateEmail({
      language: userData?.language || "en",
      editId: data.activityId || data.itemPath,
      name: data.user.name,
    });

    const msg: Email.SendGrid = {
      to: userData.email,
      from: "support@sentrei.com",
      subject: "",
      text: email.text(),
      html: email.html(),
    };

    return MailClient.send(msg);
  });

export default notificationEmailSend;
