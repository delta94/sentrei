import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import Analytics from "@sentrei/types/models/Analytics";

import statsPlus from "../statsPlus";

const testEnv = functions();
const db = admin.firestore();

beforeAll(() => {
  spyOn(db.doc(""), "update").and.returnValue("updated");
});

test("Do not update untracked collections on analytics", async done => {
  const context = {params: {collection: "analytics"}};
  const wrapped = testEnv.wrap(statsPlus);
  const req = await wrapped({}, context);

  expect(req).toBe(false);
  done();
});

test("Increase the actions count", async done => {
  const context = {params: {collection: "actions"}};
  const wrapped = testEnv.wrap(statsPlus);
  const req = await wrapped({}, context);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("analytics/stats");
  expect(db.doc("").update).toHaveBeenCalledWith(<Analytics.Stats>{
    actions: 1,
  });
  done();
});

test("Increase the activity count", async done => {
  const context = {params: {collection: "activity"}};
  const wrapped = testEnv.wrap(statsPlus);
  const req = await wrapped({}, context);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("analytics/stats");
  expect(db.doc("").update).toHaveBeenCalledWith(<Analytics.Stats>{
    activity: 1,
  });
  done();
});

test("Increase the profiles count", async done => {
  const context = {params: {collection: "profiles"}};
  const wrapped = testEnv.wrap(statsPlus);
  const req = await wrapped({}, context);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("analytics/stats");
  expect(db.doc("").update).toHaveBeenCalledWith(<Analytics.Stats>{
    profiles: 1,
  });
  done();
});

test("Increase the notifications count", async done => {
  const context = {params: {collection: "notifications"}};
  const wrapped = testEnv.wrap(statsPlus);
  const req = await wrapped({}, context);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("analytics/stats");
  expect(db.doc("").update).toHaveBeenCalledWith(<Analytics.Stats>{
    notifications: 1,
  });
  done();
});

test("Increase the rooms count", async done => {
  const context = {params: {collection: "rooms"}};
  const wrapped = testEnv.wrap(statsPlus);
  const req = await wrapped({}, context);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("analytics/stats");
  expect(db.doc("").update).toHaveBeenCalledWith(<Analytics.Stats>{rooms: 1});
  done();
});

test("Increase the rooms count", async done => {
  const context = {params: {collection: "spaces"}};
  const wrapped = testEnv.wrap(statsPlus);
  const req = await wrapped({}, context);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("analytics/stats");
  expect(db.doc("").update).toHaveBeenCalledWith(<Analytics.Stats>{spaces: 1});
  done();
});

test("Increase the users count", async done => {
  const context = {params: {collection: "users"}};
  const wrapped = testEnv.wrap(statsPlus);
  const req = await wrapped({}, context);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("analytics/stats");
  expect(db.doc("").update).toHaveBeenCalledWith(<Analytics.Stats>{users: 1});
  done();
});

test("Increase the usernames count", async done => {
  const context = {params: {collection: "usernames"}};
  const wrapped = testEnv.wrap(statsPlus);
  const req = await wrapped({}, context);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("analytics/stats");
  expect(db.doc("").update).toHaveBeenCalledWith(<Analytics.Stats>{
    usernames: 1,
  });
  done();
});
