import * as firebase from "@firebase/testing";

import {profileResponse} from "@sentrei/functions/__dummy__/Profile";

import {userResponse} from "@sentrei/functions/__dummy__/User";
import {timestamp} from "@sentrei/functions/__mocks__/firebase-testing";
import {
  initializeAdminApp,
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "@sentrei/functions/helpers/testHelpers";
import User from "@sentrei/types/models/User";
import Username from "@sentrei/types/models/Username";

let admin: firebase.firestore.Firestore;
let db: firebase.firestore.Firestore;
let ref: firebase.firestore.DocumentReference;

beforeAll(async done => {
  admin = initializeAdminApp();
  db = initializeFirebaseApp(<Username>{uid: "userId"});
  ref = db.doc("spaces/spaceId/members/userId");
  await loadFirestoreRules();
  await admin
    .doc("users/userId")
    .set(<User.Response>{...userResponse, role: "viewer"});
  await admin.doc("spaces/spaceId/members/userId").set(profileResponse);
  await admin.doc("spaces/spaceId/members/otherUserId").set(profileResponse);
  await admin
    .doc("spaces/otherSpaceId/members/otherUserId")
    .set(profileResponse);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Can read", async done => {
  const docRef = db.doc("spaces/spaceId/members/otherUserId");
  await firebase.assertSucceeds(docRef.get());
  done();
});

test("Admins can read", async done => {
  await admin.doc("users/userId").set(<User.Update>{role: "admin"});
  await firebase.assertSucceeds(ref.get());
  done();
});

test("Moderators can read", async done => {
  await admin.doc("users/userId").set(<User.Update>{role: "moderator"});
  await firebase.assertSucceeds(ref.get());
  done();
});

test("Viewers can not read", async done => {
  const docRef = db.doc("spaces/otherSpaceId/members/otherUserId");
  await admin.doc("users/userId").set(<User.Update>{role: "viewer"});
  await firebase.assertFails(docRef.get());
  done();
});

test("Can list 30 users", async done => {
  const colRef = db.collection("spaces/spaceId/members");
  await firebase.assertSucceeds(colRef.limit(30).get());
  done();
});

test("Users can not join a space", async done => {
  await admin.doc("spaces/spaceId/members/userId").delete();
  await firebase.assertFails(ref.set(profileResponse));
  done();
});

test("Users can leave a space", async done => {
  await admin.doc("spaces/spaceId/members/userId").set(profileResponse);
  await firebase.assertSucceeds(ref.delete());
  done();
});

test("Users can delete other users", async done => {
  const docRef = db.doc("spaces/spaceId/members/otherUserId");
  await firebase.assertFails(docRef.delete());
  done();
});

test("Can not leave a space using a fake userId", async done => {
  const docRef = db.doc("spaces/spaceId/members/fakeUserId");
  await firebase.assertFails(docRef.delete());
  done();
});

test("Can not update", async done => {
  await admin.doc("spaces/spaceId/members/userId").set(profileResponse);
  await firebase.assertFails(ref.update({timestamp}));
  done();
});

test("Admins can delete", async done => {
  await admin.doc("users/userId").set(<User.Update>{role: "admin"});
  await firebase.assertSucceeds(ref.delete());
  done();
});

test("Moderators can delete", async done => {
  await admin.doc("users/userId").set(<User.Update>{role: "moderator"});
  await firebase.assertSucceeds(ref.delete());
  done();
});

test("Viewers can not delete", async done => {
  await admin.doc("spaces/spaceId/members/userId").delete();
  await admin.doc("users/userId").set(<User.Update>{role: "viewer"});
  await firebase.assertFails(ref.delete());
  done();
});
