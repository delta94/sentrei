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

test("Increase the invites count", async done => {
  const context = {params: {collection: "invites"}};
  const wrapped = testEnv.wrap(statsPlus);
  const req = await wrapped({}, context);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("analytics/stats");
  expect(db.doc("").update).toHaveBeenCalledWith(<Analytics.Stats>{invites: 1});
  done();
});

test("Increase the members count", async done => {
  const context = {params: {collection: "members"}};
  const wrapped = testEnv.wrap(statsPlus);
  const req = await wrapped({}, context);

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("analytics/stats");
  expect(db.doc("").update).toHaveBeenCalledWith(<Analytics.Stats>{members: 1});
  done();
});
