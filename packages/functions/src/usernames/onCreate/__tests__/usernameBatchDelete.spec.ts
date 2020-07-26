import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import Username from "@sentrei/types/models/Username";

import usernameBatchDelete from "../usernameBatchDelete";

const testEnv = functions();
const db = admin.firestore();

test("Remove all older usernames from the database", async done => {
  const usernames = [
    {id: "1", ref: "1"},
    {id: "2", ref: "2"},
    {id: "3", ref: "3"},
  ];

  spyOn(db.batch(), "commit").and.returnValue("updated");
  spyOn(db.collection("").where("", "==", ""), "get").and.returnValue({
    docs: usernames,
  });

  const snap = {
    id: "2",
    data: (): Username => ({uid: "userId"}),
  };
  const wrapped = testEnv.wrap(usernameBatchDelete);
  const req = await wrapped(snap);

  expect(req).toBe("updated");
  expect(db.collection).toHaveBeenCalledWith("usernames");
  expect(db.collection("").where).toHaveBeenCalledWith("uid", "==", "userId");
  expect(db.batch().delete).toHaveBeenCalledWith("1");
  expect(db.batch().delete).not.toHaveBeenCalledWith("2");
  expect(db.batch().delete).toHaveBeenCalledWith("3");
  done();
});
