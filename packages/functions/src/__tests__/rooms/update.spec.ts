import * as firebase from "@firebase/testing";

import {profileGet} from "@sentrei/functions/__dummy__/Profile";
import {roomUpdate} from "@sentrei/functions/__dummy__/Room";

import {
  initializeAdminApp,
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "@sentrei/functions/helpers/testHelpers";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";

let admin: firebase.firestore.Firestore;
let db: firebase.firestore.Firestore;
let ref: firebase.firestore.DocumentReference;

beforeAll(async done => {
  admin = initializeAdminApp();
  db = initializeFirebaseApp({uid: "userId"});
  ref = db.doc("rooms/roomId");
  await loadFirestoreRules();
  await admin.doc("profiles/userId").set(profileGet);
  await admin.doc("rooms/roomId").set(<Room.Create>roomUpdate);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Authenticated users can update", async done => {
  await firebase.assertSucceeds(ref.update(<Room.Update>roomUpdate));
  done();
});

test("Unauthenticated users can not update", async done => {
  const app = initializeFirebaseApp(undefined);
  const newRef = app.doc("rooms/roomId");
  await firebase.assertFails(newRef.update(<Room.Create>roomUpdate));
  done();
});

test("CreatedAt can not be changed", async done => {
  const changes = {
    ...roomUpdate,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  await firebase.assertFails(ref.update(<Room.Update>changes));
  done();
});

test("CreatedBy can not be changed", async done => {
  await firebase.assertFails(
    ref.update(<Room.Update>{...roomUpdate, createdBy: "new"}),
  );
  done();
});

test("CreatedById can not be changed", async done => {
  await firebase.assertFails(
    ref.update(<Room.Update>{...roomUpdate, createdByUid: "other"}),
  );
  done();
});

test("Description is a string", async done => {
  await firebase.assertSucceeds(ref.update({...roomUpdate, description: "s"}));
  await firebase.assertFails(ref.update({...roomUpdate, description: 123}));
  await firebase.assertFails(ref.update({...roomUpdate, description: true}));
  await firebase.assertFails(ref.update({...roomUpdate, description: {}}));
  await firebase.assertFails(
    ref.update({...roomUpdate, description: ["test"]}),
  );
  done();
});

test("Description can be null", async done => {
  await firebase.assertSucceeds(
    ref.update(<Room.Create>{...roomUpdate, description: null}),
  );
  done();
});

test("MemberCount can not be changed", async done => {
  await firebase.assertFails(
    ref.update(<Room.Update>{...roomUpdate, memberCount: 1}),
  );
  done();
});

test("Photo is a string", async done => {
  await firebase.assertSucceeds(
    ref.update(<Room.Update>{...roomUpdate, photo: "photo.png"}),
  );
  await firebase.assertFails(ref.update({...roomUpdate, photo: 123}));
  await firebase.assertFails(ref.update({...roomUpdate, photo: true}));
  await firebase.assertFails(ref.update({...roomUpdate, photo: {1: true}}));
  await firebase.assertFails(ref.update({...roomUpdate, photo: ["test"]}));
  done();
});

test("Photo can be null", async done => {
  await firebase.assertSucceeds(
    ref.update(<Room.Update>{...roomUpdate, photo: null}),
  );
  done();
});

test("UpdatedAt has a valid timestamp", async done => {
  await firebase.assertFails(ref.update({...roomUpdate, updatedAt: "today"}));
  await firebase.assertFails(
    ref.update({...roomUpdate, updatedAt: new Date()}),
  );
  done();
});

test("UpdatedBy has a valid user name", async done => {
  const updatedBy: Profile.Response = {...profileGet, name: "invalid"};
  await firebase.assertFails(
    ref.update(<Room.Update>{...roomUpdate, updatedBy}),
  );
  done();
});

test("UpdatedBy has a valid user photo", async done => {
  const updatedBy: Profile.Response = {...profileGet, photo: "invalid"};
  await firebase.assertFails(
    ref.update(<Room.Update>{...roomUpdate, updatedBy}),
  );
  done();
});

test("UpdatedBy has a valid username", async done => {
  const updatedBy: Profile.Response = {...profileGet, username: "invalid"};
  await firebase.assertFails(
    ref.update(<Room.Update>{...roomUpdate, updatedBy}),
  );
  done();
});

test("UpdatedById has the current user userId", async done => {
  await firebase.assertFails(
    ref.update(<Room.Update>{...roomUpdate, updatedByUid: "other"}),
  );
  done();
});
