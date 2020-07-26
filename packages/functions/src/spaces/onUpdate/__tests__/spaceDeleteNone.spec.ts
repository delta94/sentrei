import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {spaceResponse} from "@sentrei/functions/__dummy__/Space";
import Space from "@sentrei/types/models/Space";

import spaceDeleteNone from "../spaceDeleteNone";

const testEnv = functions();
const db = admin.firestore();

beforeAll(() => {
  spyOn(Promise, "all").and.returnValue("updated");
});

beforeEach(() => {
  jest.clearAllMocks();
});

test("Delete space when memberCount is empty", async done => {
  spyOn(db.doc(""), "delete").and.returnValue("ref");

  const after = {
    data: (): Space.Response => spaceResponse,
  };
  const changes = {after};
  const context = {params: {spaceId: "spaceId"}};

  const wrapped = testEnv.wrap(spaceDeleteNone);
  const req = await wrapped(changes, context);

  expect(req).toBe("ref");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId");
  expect(db.doc("").delete).toHaveBeenCalledTimes(1);
  done();
});

test("Do not delete space when memberCount is not empty", async done => {
  const afterData: Space.Response = {
    ...spaceResponse,
    memberCount: 3,
  };
  const after = {
    data: (): Space.Response => afterData,
  };
  const changes = {after};
  const context = {params: {spaceId: "spaceId"}};

  const wrapped = testEnv.wrap(spaceDeleteNone);
  const req = await wrapped(changes, context);

  expect(req).toBe(false);
  expect(db.doc).not.toHaveBeenCalled();
  expect(db.collection).not.toHaveBeenCalled();
  done();
});
