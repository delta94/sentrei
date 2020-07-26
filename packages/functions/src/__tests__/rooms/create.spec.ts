import * as firebase from "@firebase/testing";

import {profileGet} from "@sentrei/functions/__dummy__/Profile";
import {roomCreate} from "@sentrei/functions/__dummy__/Room";
import {username} from "@sentrei/functions/__dummy__/Username";

import {
  initializeAdminApp,
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "@sentrei/functions/helpers/testHelpers";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Username from "@sentrei/types/models/Username";

let admin: firebase.firestore.Firestore;
let db: firebase.firestore.Firestore;
let ref: firebase.firestore.CollectionReference;

beforeAll(async done => {
  admin = initializeAdminApp();
  db = initializeFirebaseApp(<Username>username);
  ref = db.collection("rooms");
  await loadFirestoreRules();
  await admin.doc("spaces/spaceId/members/userId").set(profileGet);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Authenticated users can create", async done => {
  await firebase.assertSucceeds(ref.add(<Room.Create>roomCreate));
  done();
});

test("Anonymous users can not create", async done => {
  const app = initializeFirebaseApp(undefined);
  const newRef = app.collection("rooms");
  await firebase.assertFails(newRef.add(<Room.Create>roomCreate));
  done();
});

test("CreatedAt has a valid timestamp", async done => {
  await firebase.assertFails(ref.add({...roomCreate, createdAt: "1452-10-01"}));
  await firebase.assertFails(ref.add({...roomCreate, createdAt: new Date()}));
  done();
});

test("CreatedBy has a valid user name", async done => {
  const createdBy: Profile.Get = {...profileGet, name: "invalid"};
  await firebase.assertFails(ref.add(<Room.Create>{...roomCreate, createdBy}));
  done();
});

test("CreatedBy has a valid user photo", async done => {
  const createdBy: Profile.Get = {...profileGet, photo: "invalid"};
  await firebase.assertFails(ref.add(<Room.Create>{...roomCreate, createdBy}));
  done();
});

test("CreatedBy has a valid username", async done => {
  const createdBy: Profile.Get = {...profileGet, username: "invalid"};
  await firebase.assertFails(ref.add(<Room.Create>{...roomCreate, createdBy}));
  done();
});

test("CreatedById has the current user userId", async done => {
  await firebase.assertFails(
    ref.add(<Room.Create>{...roomCreate, createdByUid: "other"}),
  );
  done();
});

test("Description is a string", async done => {
  await firebase.assertFails(ref.add({...roomCreate, description: 123}));
  await firebase.assertFails(ref.add({...roomCreate, description: true}));
  await firebase.assertFails(ref.add({...roomCreate, description: {1: true}}));
  await firebase.assertFails(ref.add({...roomCreate, description: ["test"]}));
  done();
});

test("Description can be null", async done => {
  await firebase.assertSucceeds(
    ref.add(<Room.Create>{...roomCreate, description: null}),
  );
  done();
});

test("MemberCount is set to 0", async done => {
  await firebase.assertSucceeds(
    ref.add(<Room.Create>{...roomCreate, memberCount: 0}),
  );
  await firebase.assertFails(
    ref.add(<Room.Create>{...roomCreate, memberCount: 1}),
  );
  done();
});

test("Photo is a string", async done => {
  await firebase.assertSucceeds(
    ref.add(<Room.Create>{...roomCreate, photo: "photo.png"}),
  );
  await firebase.assertFails(ref.add({...roomCreate, photo: 123}));
  await firebase.assertFails(ref.add({...roomCreate, photo: true}));
  await firebase.assertFails(ref.add({...roomCreate, photo: {1: true}}));
  await firebase.assertFails(ref.add({...roomCreate, photo: ["test"]}));
  done();
});

test("Photo can be null", async done => {
  await firebase.assertSucceeds(
    ref.add(<Room.Create>{...roomCreate, photo: null}),
  );
  done();
});

test("UpdatedAt has a valid timestamp", async done => {
  await firebase.assertFails(ref.add({...roomCreate, updatedAt: "1452-10-01"}));
  await firebase.assertFails(ref.add({...roomCreate, updatedAt: new Date()}));
  done();
});

test("UpdatedBy has a valid name", async done => {
  const updatedBy: Profile.Get = {...profileGet, name: "invalid"};
  await firebase.assertFails(ref.add({...roomCreate, updatedBy}));
  done();
});

test("UpdatedBy has a valid user photo", async done => {
  const updatedBy: Profile.Get = {...profileGet, photo: "invalid"};
  await firebase.assertFails(ref.add({...roomCreate, updatedBy}));
  done();
});

test("UpdatedBy has a valid username", async done => {
  const updatedBy: Profile.Get = {...profileGet, username: "invalid"};
  await firebase.assertFails(ref.add({...roomCreate, updatedBy}));
  done();
});

test("UpdatedById has the current user userId", async done => {
  await firebase.assertFails(
    ref.add(<Room.Create>{...roomCreate, updatedByUid: "other"}),
  );
  done();
});
