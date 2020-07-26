import * as admin from "firebase-admin";
import functions from "firebase-functions-test";
import {when} from "jest-when";

import {
  activitySpaceResponseCreated,
  activitySpaceResponseDeleted,
  activitySpaceResponseUpdated,
  activityRoomResponseCreated,
  activityRoomResponseDeleted,
  activityRoomResponseUpdated,
} from "@sentrei/functions/__dummy__/Activity";
import {roomResponse} from "@sentrei/functions/__dummy__/Room";

import scoreActions from "@sentrei/functions/helpers/scoreActions";
import Activity from "@sentrei/types/models/Activity";

import scoreBatchUpdate from "../scoreBatchUpdate";

const testEnv = functions();
const db = admin.firestore();
const batch = db.batch();
const merge = true;

beforeEach(() => {
  jest.clearAllMocks();
  spyOn(batch, "commit").and.returnValue(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/leaderboard/userId")
    .mockReturnValue("spaceRef");
});

test("Increase score when a space item is created", async done => {
  const snap = {
    data: (): Activity.Response => activitySpaceResponseCreated,
  };
  const wrapped = testEnv.wrap(scoreBatchUpdate);
  const req = await wrapped(snap);
  const payload = {
    createdByUid: "userId",
    score: scoreActions.created_spaces,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/leaderboard/userId");
  expect(db.doc).toHaveBeenCalledTimes(1);
  expect(batch.set).toHaveBeenCalledWith("spaceRef", payload, {merge});
  done();
});

test("Increase score when a space item is updated", async done => {
  const snap = {
    data: (): Activity.Response => activitySpaceResponseUpdated,
  };
  const wrapped = testEnv.wrap(scoreBatchUpdate);
  const req = await wrapped(snap);
  const payload = {
    createdByUid: "userId",
    score: scoreActions.updated_spaces,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/leaderboard/userId");
  expect(db.doc).toHaveBeenCalledTimes(1);
  expect(batch.set).toHaveBeenCalledWith("spaceRef", payload, {merge});
  done();
});

test("Do not do anything when a space item is deleted", async done => {
  const snap = {
    data: (): Activity.Response => activitySpaceResponseDeleted,
  };
  const wrapped = testEnv.wrap(scoreBatchUpdate);
  const req = await wrapped(snap);

  expect(req).toBe(false);
  expect(db.doc).not.toHaveBeenCalledWith("spaces/spaceId/leaderboard/userId");
  expect(db.doc).toHaveBeenCalledTimes(0);
  done();
});

test("Increase score when a room item is created", async done => {
  const snap = {
    data: (): Activity.Response => activityRoomResponseCreated,
  };
  const wrapped = testEnv.wrap(scoreBatchUpdate);
  const req = await wrapped(snap);
  const payload = {
    createdByUid: "userId",
    score: scoreActions.created_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/leaderboard/userId");
  expect(db.doc).toHaveBeenCalledTimes(1);
  expect(batch.set).toHaveBeenCalledWith("spaceRef", payload, {merge});
  done();
});

test("Increase score when a room item is updated", async done => {
  const snap = {
    data: (): Activity.Response => activityRoomResponseUpdated,
  };
  const wrapped = testEnv.wrap(scoreBatchUpdate);
  const req = await wrapped(snap);
  const payload = {
    createdByUid: "userId",
    score: scoreActions.updated_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/leaderboard/userId");
  expect(db.doc).toHaveBeenCalledTimes(1);
  expect(batch.set).toHaveBeenCalledWith("spaceRef", payload, {merge});
  done();
});

test("Decrease score when a room item is deleted by author", async done => {
  const snap = {
    data: (): Activity.Response => activityRoomResponseDeleted,
  };
  const wrapped = testEnv.wrap(scoreBatchUpdate);
  const req = await wrapped(snap);
  const payload = {
    createdByUid: "userId",
    score: -scoreActions.created_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/leaderboard/userId");
  expect(db.doc).toHaveBeenCalledTimes(1);
  expect(batch.set).toHaveBeenCalledWith("spaceRef", payload, {merge});
  done();
});

test("Decrease score when a room item is deleted by other user", async done => {
  const data: Activity.Response = {
    ...activityRoomResponseDeleted,
    before: {...roomResponse, createdByUid: "otherUserId"},
  };
  const snap = {
    data: (): Activity.Response => data,
  };
  const wrapped = testEnv.wrap(scoreBatchUpdate);
  const req = await wrapped(snap);
  const payload = {
    createdByUid: "userId",
    score: scoreActions.deleted_rooms,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/leaderboard/userId");
  expect(db.doc).toHaveBeenCalledTimes(1);
  expect(batch.set).toHaveBeenCalledWith("spaceRef", payload, {merge});
  done();
});
