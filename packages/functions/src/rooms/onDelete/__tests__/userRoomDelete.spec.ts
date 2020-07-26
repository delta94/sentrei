import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import userRoomDelete from "../userRoomDelete";

const testEnv = functions();
const db = admin.firestore();

test("On rooms delete, delete user rooms on delete rooms", async done => {
  const docs = [{id: "user1"}, {id: "user2"}, {id: "user3"}];
  spyOn(Promise, "all").and.returnValue("updated");
  spyOn(db.collection(""), "get").and.returnValue({docs});
  spyOn(db.doc(""), "delete").and.returnValue("ref");

  const snap = {id: "roomId"};
  const wrapped = testEnv.wrap(userRoomDelete);
  const req = await wrapped(snap);

  expect(req).toBe("updated");
  expect(db.collection).toHaveBeenCalledWith("rooms/roomId/members");
  expect(db.doc).toHaveBeenCalledWith("users/user1/rooms/roomId");
  expect(db.doc).toHaveBeenCalledWith("users/user2/rooms/roomId");
  expect(db.doc).toHaveBeenCalledWith("users/user3/rooms/roomId");
  expect(db.doc("").delete).toHaveBeenCalledTimes(3);
  expect(Promise.all).toHaveBeenCalledWith(["ref", "ref", "ref"]);
  done();
});
