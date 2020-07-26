import * as firebase from "@firebase/testing";

import {username} from "@sentrei/functions/__dummy__/Username";
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
  collection = db.collection("usernames");
  doc = collection.doc("sentrei");
  await loadFirestoreRules();
  await admin
    .doc("usernames/sentrei")
    .set(<Username>{...username, uid: "otherUserId"});
  done();
});

afterAll(async done => {
  await removeApps();
  done();
});

test("Can read a single username", async done => {
  await firebase.assertSucceeds(doc.get());
  done();
});

test("Can not list usernames", async done => {
  await firebase.assertFails(collection.get());
  done();
});

test("Everyone can create", async done => {
  const ref = collection.doc("newuser");
  await firebase.assertSucceeds(ref.set(<Username>username));
  done();
});

test("Can not create for anonymous users ", async done => {
  const app = initializeFirebaseApp(undefined);
  const ref = app.collection("usernames");
  await firebase.assertFails(ref.add(<Username>{uid: null}));
  done();
});

test("Can not create using the userId of other users", async done => {
  await firebase.assertFails(collection.add(<Username>{uid: "otherUserId"}));
  done();
});

test("Can not have a dot (.) at the beginning", async done => {
  const ref = collection.doc(".myuser");
  await firebase.assertFails(ref.set(<Username>{uid: "userId"}));
  done();
});

test("Can not have a dot (.) at the end", async done => {
  const ref = collection.doc("myuser.");
  await firebase.assertFails(ref.set(<Username>{uid: "userId"}));
  done();
});

test("Can not have two dots (..) in a row", async done => {
  const ref = collection.doc("my..user");
  await firebase.assertFails(ref.set(<Username>{uid: "userId"}));
  done();
});

test("Can not have an underscore (_) at the beginning", async done => {
  const ref = collection.doc("_myuser");
  await firebase.assertFails(ref.set(<Username>{uid: "userId"}));
  done();
});

test("Can not have uppercase characters", async done => {
  const start = collection.doc("Myuser");
  const middle = collection.doc("myUser");
  const end = collection.doc("myuseR");
  await firebase.assertFails(start.set(<Username>{uid: "userId"}));
  await firebase.assertFails(middle.set(<Username>{uid: "userId"}));
  await firebase.assertFails(end.set(<Username>{uid: "userId"}));
  done();
});

test("Can have numbers", async done => {
  const ref = collection.doc("myuser89");
  await firebase.assertSucceeds(ref.set(username));
  done();
});

test("Can not have special characters", async done => {
  const comma = collection.doc("u,ser");
  const cedil = collection.doc("testças");
  const til = collection.doc("anão");
  const exclamation = collection.doc("test!");
  const question = collection.doc("test?");
  await firebase.assertFails(comma.set(<Username>{uid: "userId"}));
  await firebase.assertFails(cedil.set(<Username>{uid: "userId"}));
  await firebase.assertFails(til.set(<Username>{uid: "userId"}));
  await firebase.assertFails(exclamation.set(<Username>{uid: "userId"}));
  await firebase.assertFails(question.set(<Username>{uid: "userId"}));
  done();
});

test("Can not update using the userId of other users", async done => {
  await firebase.assertFails(doc.update(<Username>{uid: "otherUserId"}));
  done();
});

test("Can not delete", async done => {
  await firebase.assertFails(doc.delete());
  done();
});
