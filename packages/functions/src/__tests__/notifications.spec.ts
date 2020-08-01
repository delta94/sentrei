import * as firebase from "@firebase/testing";

import {notificationUpdateResponse} from "@sentrei/functions/__dummy__/Notification";
import {username} from "@sentrei/functions/__dummy__/Username";
import Notification from "@sentrei/types/models/Notification";

import {
  initializeAdminApp,
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "../helpers/testHelpers";

let admin: firebase.firestore.Firestore;
let db: firebase.firestore.Firestore;
let collection: firebase.firestore.CollectionReference;
let doc: firebase.firestore.DocumentReference;

beforeAll(async done => {
  admin = initializeAdminApp();
  db = initializeFirebaseApp(username);
  collection = db.collection("users/userId/notifications");
  doc = collection.doc("notificationId");
  await loadFirestoreRules();
  await admin
    .doc("users/userId/notifications/notificationId")
    .set(<Notification.Response>notificationUpdateResponse);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Users can read own notifications", async done => {
  await firebase.assertSucceeds(doc.get());
  done();
});

test("Users can list own notification items", async done => {
  await firebase.assertSucceeds(collection.get());
  done();
});

test("Can not read notification items from other users", async done => {
  const ref = db.doc("users/otherUserId/notifications/notificationId");
  await firebase.assertFails(ref.get());
  done();
});

test("Can not list notification items from other users", async done => {
  const ref = db.collection("users/otherUserId/notifications");
  await firebase.assertFails(ref.get());
  done();
});

test("Can not update a notification item", async done => {
  await firebase.assertFails(
    doc.update(<Notification.Response>notificationUpdateResponse),
  );
  done();
});

test("Can delete a notification item", async done => {
  await firebase.assertSucceeds(doc.delete());
  done();
});
