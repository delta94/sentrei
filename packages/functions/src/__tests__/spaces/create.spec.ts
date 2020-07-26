import * as firebase from "@firebase/testing";

import {profileGet} from "@sentrei/functions/__dummy__/Profile";
import {spaceCreate} from "@sentrei/functions/__dummy__/Space";
import {username} from "@sentrei/functions/__dummy__/Username";

import {
  initializeAdminApp,
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "@sentrei/functions/helpers/testHelpers";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import Username from "@sentrei/types/models/Username";

let admin: firebase.firestore.Firestore;
let db: firebase.firestore.Firestore;
let ref: firebase.firestore.CollectionReference;

beforeAll(async done => {
  admin = initializeAdminApp();
  db = initializeFirebaseApp(<Username>username);
  ref = db.collection("spaces");
  await loadFirestoreRules();
  await admin.doc("profiles/userId").set(profileGet);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Authenticated users can create", async done => {
  await firebase.assertSucceeds(ref.add(<Space.Create>spaceCreate));
  done();
});

test("Anonymous users can not create", async done => {
  const app = initializeFirebaseApp(undefined);
  const newRef = app.collection("spaces");
  await firebase.assertFails(newRef.add(<Space.Create>spaceCreate));
  done();
});

test("CreatedAt has a valid timestamp", async done => {
  await firebase.assertFails(
    ref.add({...spaceCreate, createdAt: "1452-10-01"}),
  );
  await firebase.assertFails(ref.add({...spaceCreate, createdAt: new Date()}));
  done();
});

test("CreatedBy has a valid user name", async done => {
  const createdBy: Profile.Get = {...profileGet, name: "invalid"};
  await firebase.assertFails(
    ref.add(<Space.Create>{...spaceCreate, createdBy}),
  );
  done();
});

test("CreatedBy has a valid user photo", async done => {
  const createdBy: Profile.Get = {...profileGet, photo: "invalid"};
  await firebase.assertFails(
    ref.add(<Space.Create>{...spaceCreate, createdBy}),
  );
  done();
});

test("CreatedBy has a valid username", async done => {
  const createdBy: Profile.Get = {...profileGet, username: "invalid"};
  await firebase.assertFails(
    ref.add(<Space.Create>{...spaceCreate, createdBy}),
  );
  done();
});

test("CreatedById has the current user userId", async done => {
  await firebase.assertFails(
    ref.add(<Space.Create>{...spaceCreate, createdByUid: "other"}),
  );
  done();
});

test("Description is a string", async done => {
  await firebase.assertFails(ref.add({...spaceCreate, description: 123}));
  await firebase.assertFails(ref.add({...spaceCreate, description: true}));
  await firebase.assertFails(ref.add({...spaceCreate, description: {1: true}}));
  await firebase.assertFails(ref.add({...spaceCreate, description: ["test"]}));
  done();
});

test("Description can be null", async done => {
  await firebase.assertSucceeds(
    ref.add(<Space.Create>{...spaceCreate, description: null}),
  );
  done();
});

test("MemberCount is set to 0", async done => {
  await firebase.assertSucceeds(
    ref.add(<Space.Create>{...spaceCreate, memberCount: 0}),
  );
  await firebase.assertFails(
    ref.add(<Space.Create>{...spaceCreate, memberCount: 1}),
  );
  done();
});

test("Photo is a string", async done => {
  await firebase.assertSucceeds(
    ref.add(<Space.Create>{...spaceCreate, photo: "photo.png"}),
  );
  await firebase.assertFails(ref.add({...spaceCreate, photo: 123}));
  await firebase.assertFails(ref.add({...spaceCreate, photo: true}));
  await firebase.assertFails(ref.add({...spaceCreate, photo: {1: true}}));
  await firebase.assertFails(ref.add({...spaceCreate, photo: ["test"]}));
  done();
});

test("Photo can be null", async done => {
  await firebase.assertSucceeds(
    ref.add(<Space.Create>{...spaceCreate, photo: null}),
  );
  done();
});

test("Name is a string", async done => {
  await firebase.assertSucceeds(
    ref.add(<Space.Create>{...spaceCreate, name: "name"}),
  );
  await firebase.assertFails(ref.add({...spaceCreate, name: 123}));
  await firebase.assertFails(ref.add({...spaceCreate, name: true}));
  await firebase.assertFails(ref.add({...spaceCreate, name: {1: true}}));
  await firebase.assertFails(ref.add({...spaceCreate, name: ["test"]}));
  done();
});

test("Name can not be null", async done => {
  await firebase.assertFails(
    ref.add(<Space.Create>{...spaceCreate, name: null}),
  );
  done();
});

test("UpdatedAt has a valid timestamp", async done => {
  await firebase.assertFails(
    ref.add({...spaceCreate, updatedAt: "1452-10-01"}),
  );
  await firebase.assertFails(ref.add({...spaceCreate, updatedAt: new Date()}));
  done();
});

test("UpdatedBy has a valid name", async done => {
  const updatedBy: Profile.Get = {...profileGet, name: "invalid"};
  await firebase.assertFails(ref.add({...spaceCreate, updatedBy}));
  done();
});

test("UpdatedBy has a valid user photo", async done => {
  const updatedBy: Profile.Get = {...profileGet, photo: "invalid"};
  await firebase.assertFails(ref.add({...spaceCreate, updatedBy}));
  done();
});

test("UpdatedBy has a valid username", async done => {
  const updatedBy: Profile.Get = {...profileGet, username: "invalid"};
  await firebase.assertFails(ref.add({...spaceCreate, updatedBy}));
  done();
});

test("UpdatedById has the current user userId", async done => {
  await firebase.assertFails(
    ref.add(<Space.Create>{...spaceCreate, updatedByUid: "other"}),
  );
  done();
});
