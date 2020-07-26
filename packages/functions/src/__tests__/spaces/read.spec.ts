import * as firebase from "@firebase/testing";

import {
  initializeFirebaseApp,
  loadFirestoreRules,
  removeApps,
} from "@sentrei/functions/helpers/testHelpers";
import Username from "@sentrei/types/models/Username";

let db: firebase.firestore.Firestore;

beforeAll(async done => {
  db = initializeFirebaseApp(<Username>{uid: "userId"});
  await loadFirestoreRules();
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("User can get space item", async done => {
  const docRef = db.doc("spaces/spaceId");
  await firebase.assertSucceeds(docRef.get());
  done();
});

test("User can not list space items", async done => {
  const colRef = db.collection("spaces");
  await firebase.assertFails(colRef.get());
  done();
});
