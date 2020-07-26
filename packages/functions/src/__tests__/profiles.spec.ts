import * as firebase from "@firebase/testing";

import {
  profileGet,
  profileResponse,
} from "@sentrei/functions/__dummy__/Profile";
import {username} from "@sentrei/functions/__dummy__/Username";
import Profile from "@sentrei/types/models/Profile";
import Username from "@sentrei/types/models/Username";

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
  db = initializeFirebaseApp(<Username>{...username, uid: "profileId"});
  collection = db.collection("profiles");
  doc = collection.doc("profileId");
  await loadFirestoreRules();
  await admin.doc("profiles/profileId").set(<Profile.Response>profileResponse);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Can not create", async done => {
  await firebase.assertFails(collection.add(<Profile.Get>profileGet));
  done();
});

test("Users can update own data", async done => {
  await firebase.assertSucceeds(doc.update(<Profile.Update>{name: "new"}));
  done();
});

test("Can not update data from other users", async done => {
  const ref = db.doc("profiles/otherProfileId");
  await admin
    .doc("profiles/otherProfileId")
    .set(<Profile.Update>{name: "other"});
  await firebase.assertFails(ref.update(<Profile.Update>{name: "changed"}));
  done();
});

test("Can not update the username field", async done => {
  await firebase.assertFails(doc.update(<Profile.Update>{username: "new"}));
  done();
});

test("Can not delete", async done => {
  await firebase.assertFails(doc.delete());
  done();
});

test("Can read an item", async done => {
  await firebase.assertSucceeds(doc.get());
  done();
});

test("Can list one item", async done => {
  await firebase.assertSucceeds(collection.limit(1).get());
  done();
});

test("Can not list more than one item", async done => {
  await firebase.assertFails(collection.limit(2).get());
  done();
});
