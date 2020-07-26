import * as firebase from "@firebase/testing";

import {analyticsStats} from "@sentrei/functions/__dummy__/Analytics";
import {username} from "@sentrei/functions/__dummy__/Username";
import Analytics from "@sentrei/types/models/Analytics";
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
  db = initializeFirebaseApp(<Username>username);
  collection = db.collection("analytics");
  doc = collection.doc("stats");
  await loadFirestoreRules();
  await admin.doc("analytics/stats").set(<Analytics.Stats>analyticsStats);
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Everyone can read an analytics item", async done => {
  await firebase.assertSucceeds(doc.get());
  done();
});

test("Can not list analytics items", async done => {
  await firebase.assertFails(collection.get());
  done();
});

test("Can not create an analytics item", async done => {
  await firebase.assertFails(collection.add(<Analytics.Stats>analyticsStats));
  done();
});

test("Can not update an analytics item", async done => {
  await firebase.assertFails(doc.update(<Analytics.Stats>analyticsStats));
  done();
});

test("Can not delete an analytics item", async done => {
  await firebase.assertFails(doc.delete());
  done();
});
