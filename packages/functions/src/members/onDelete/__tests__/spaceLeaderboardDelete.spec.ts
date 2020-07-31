import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import spaceLeaderboardDelete from "../spaceLeaderboardDelete";

const testEnv = functions();
const db = admin.firestore();

test("On members delete, update space to delete a spaces's leaderboard", async done => {
  spyOn(db.doc(""), "delete").and.returnValue("deleted");

  const params = {spaceId: "spaceId", memberId: "userId"};
  const wrapped = testEnv.wrap(spaceLeaderboardDelete);
  const req = await wrapped({}, {params});

  expect(req).toBe("deleted");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/leaderboard/userId");
  expect(db.doc("").delete).toHaveBeenCalledTimes(1);
  done();
});
