import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {roomResponse} from "@sentrei/functions/__dummy__/Room";
import Room from "@sentrei/types/models/Room";

import userSpaceUpdate from "../userRoomUpdate";

const testEnv = functions();
const db = admin.firestore();

beforeAll(() => {
  spyOn(Promise, "all").and.returnValue("updated");
});

test("On rooms update, update all user rooms on rooms update", async done => {
  const docs = [{id: "user1"}, {id: "user2"}, {id: "user3"}];
  spyOn(db.collection(""), "get").and.returnValue({docs});
  spyOn(db.doc(""), "update").and.returnValue("ref");

  const after = roomResponse;
  const before = roomResponse;
  const changes = {
    before: {data: (): Room.Response => before},
    after: {data: (): Room.Response => after, id: "roomId"},
  };
  const wrapped = testEnv.wrap(userSpaceUpdate);
  const req = await wrapped(changes);

  expect(req).toBe("updated");
  expect(db.collection).toHaveBeenCalledWith("rooms/roomId/members");
  expect(db.doc).toHaveBeenCalledWith("users/user1/rooms/roomId");
  expect(db.doc).toHaveBeenCalledWith("users/user2/rooms/roomId");
  expect(db.doc).toHaveBeenCalledWith("users/user3/rooms/roomId");
  expect(db.doc("").update).toHaveBeenCalledWith(after);
  expect(Promise.all).toHaveBeenCalledWith(["ref", "ref", "ref"]);
  done();
});
