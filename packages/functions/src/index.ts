/* eslint-disable import/prefer-default-export */
/* eslint-disable import/first */

import * as admin from "firebase-admin";

admin.initializeApp();

import * as activity from "./activity";
import * as analytics from "./analytics";
import * as log from "./log";
import * as members from "./members";
import * as notifications from "./notifications";
import * as profiles from "./profiles";
import * as rooms from "./rooms";
import * as sendgrid from "./sendgrid";
import * as spaces from "./spaces";
import * as status from "./status";
import * as twilio from "./twilio";
import * as usernames from "./usernames";
import * as users from "./users";

const v1 = {
  activity,
  analytics,
  log,
  members,
  notifications,
  profiles,
  rooms,
  sendgrid,
  spaces,
  status,
  twilio,
  usernames,
  users,
};

export {v1};
