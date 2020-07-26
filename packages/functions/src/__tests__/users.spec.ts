import * as firebase from "@firebase/testing";

import {userResponse} from "@sentrei/functions/__dummy__/User";
import {username} from "@sentrei/functions/__dummy__/Username";
import User from "@sentrei/types/models/User";

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
  collection = db.collection("users");
  doc = collection.doc("userId");
  await loadFirestoreRules();
  await admin.doc("users/userId").set(<User.Response>{
    ...userResponse,
    role: "viewer",
  });
  await admin
    .doc("users/otherUserId")
    .set(<User.Response>{...userResponse, name: "other"});
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Can read own data", async done => {
  await firebase.assertSucceeds(doc.get());
  done();
});

test("Can not read data from others", async done => {
  const ref = db.doc("users/otherUserId");
  await firebase.assertFails(ref.get());
  done();
});

test("Can not update the name field", async done => {
  await firebase.assertFails(doc.update(<User.Update>{name: "name"}));
  done();
});

test("Can not update the notificationCount field", async done => {
  await firebase.assertFails(doc.update(<User.Update>{notificationCount: 3}));
  done();
});

test("Can not update the photo field", async done => {
  await firebase.assertFails(doc.update(<User.Update>{photo: "photo.png"}));
  done();
});

test("Can not update the role field", async done => {
  await firebase.assertFails(doc.update(<User.Update>{role: "moderator"}));
  await firebase.assertFails(doc.update(<User.Update>{role: "admin"}));
  done();
});

test("Can not update the username field", async done => {
  await firebase.assertFails(doc.update(<User.Update>{username: "new"}));
  done();
});

test("Can not update data from others", async done => {
  const ref = db.doc("users/otherUserId");
  await firebase.assertFails(ref.update(<User.Update>{name: "name"}));
  done();
});

test("Can not delete an item", async done => {
  await firebase.assertFails(doc.delete());
  done();
});
