import * as firebase from "@firebase/testing";

import {profileGet} from "@sentrei/functions/__dummy__/Profile";
import {spaceUpdate} from "@sentrei/functions/__dummy__/Space";

import {
  initializeAdminApp,
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "@sentrei/functions/helpers/testHelpers";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";

let admin: firebase.firestore.Firestore;
let db: firebase.firestore.Firestore;
let ref: firebase.firestore.DocumentReference;

beforeAll(async done => {
  admin = initializeAdminApp();
  db = initializeFirebaseApp({uid: "userId"});
  ref = db.doc("spaces/spaceId");
  await loadFirestoreRules();
  await admin.doc("profiles/userId").set(profileGet);
  await admin.doc("spaces/spaceId").set(<Space.Create>spaceUpdate);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Authenticated users can update", async done => {
  await firebase.assertSucceeds(ref.update(<Space.Update>spaceUpdate));
  done();
});

test("Unauthenticated users can not update", async done => {
  const app = initializeFirebaseApp(undefined);
  const newRef = app.doc("spaces/spaceId");
  await firebase.assertFails(newRef.update(<Space.Create>spaceUpdate));
  done();
});

test("CreatedAt can not be changed", async done => {
  const changes = {
    ...spaceUpdate,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  await firebase.assertFails(ref.update(<Space.Update>changes));
  done();
});

test("CreatedBy can not be changed", async done => {
  await firebase.assertFails(
    ref.update(<Space.Update>{...spaceUpdate, createdBy: "new"}),
  );
  done();
});

test("CreatedById can not be changed", async done => {
  await firebase.assertFails(
    ref.update(<Space.Update>{...spaceUpdate, createdByUid: "other"}),
  );
  done();
});

test("Description is a string", async done => {
  await firebase.assertSucceeds(ref.update({...spaceUpdate, description: "s"}));
  await firebase.assertFails(ref.update({...spaceUpdate, description: 123}));
  await firebase.assertFails(ref.update({...spaceUpdate, description: true}));
  await firebase.assertFails(ref.update({...spaceUpdate, description: {}}));
  await firebase.assertFails(
    ref.update({...spaceUpdate, description: ["test"]}),
  );
  done();
});

test("Description can be null", async done => {
  await firebase.assertSucceeds(
    ref.update(<Space.Create>{...spaceUpdate, description: null}),
  );
  done();
});

test("MemberCount can not be changed", async done => {
  await firebase.assertFails(
    ref.update(<Space.Update>{...spaceUpdate, memberCount: 1}),
  );
  done();
});

test("Photo is a string", async done => {
  await firebase.assertSucceeds(
    ref.update(<Space.Update>{...spaceUpdate, photo: "photo.png"}),
  );
  await firebase.assertFails(ref.update({...spaceUpdate, photo: 123}));
  await firebase.assertFails(ref.update({...spaceUpdate, photo: true}));
  await firebase.assertFails(ref.update({...spaceUpdate, photo: {1: true}}));
  await firebase.assertFails(ref.update({...spaceUpdate, photo: ["test"]}));
  done();
});

test("Photo can be null", async done => {
  await firebase.assertSucceeds(
    ref.update(<Space.Update>{...spaceUpdate, photo: null}),
  );
  done();
});

test("Name is a string", async done => {
  await firebase.assertSucceeds(
    ref.update(<Space.Update>{...spaceUpdate, name: "name"}),
  );
  await firebase.assertFails(ref.update({...spaceUpdate, name: 123}));
  await firebase.assertFails(ref.update({...spaceUpdate, name: true}));
  await firebase.assertFails(ref.update({...spaceUpdate, name: {1: true}}));
  await firebase.assertFails(ref.update({...spaceUpdate, name: ["test"]}));
  done();
});

test("Name can not be null", async done => {
  await firebase.assertFails(
    ref.update(<Space.Update>{...spaceUpdate, name: null}),
  );
  done();
});

test("UpdatedAt has a valid timestamp", async done => {
  await firebase.assertFails(ref.update({...spaceUpdate, updatedAt: "today"}));
  await firebase.assertFails(
    ref.update({...spaceUpdate, updatedAt: new Date()}),
  );
  done();
});

test("UpdatedBy has a valid user name", async done => {
  const updatedBy: Profile.Response = {...profileGet, name: "invalid"};
  await firebase.assertFails(
    ref.update(<Space.Update>{...spaceUpdate, updatedBy}),
  );
  done();
});

test("UpdatedBy has a valid user photo", async done => {
  const updatedBy: Profile.Response = {...profileGet, photo: "invalid"};
  await firebase.assertFails(
    ref.update(<Space.Update>{...spaceUpdate, updatedBy}),
  );
  done();
});

test("UpdatedBy has a valid username", async done => {
  const updatedBy: Profile.Response = {...profileGet, username: "invalid"};
  await firebase.assertFails(
    ref.update(<Space.Update>{...spaceUpdate, updatedBy}),
  );
  done();
});

test("UpdatedById has the current user userId", async done => {
  await firebase.assertFails(
    ref.update(<Space.Update>{...spaceUpdate, updatedByUid: "other"}),
  );
  done();
});
