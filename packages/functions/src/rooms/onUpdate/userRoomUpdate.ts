import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Room from "@sentrei/types/models/Room";

const db = admin.firestore();

/**
 * Update rooms on users
 */
const userRoomUpdate = functions.firestore
  .document("rooms/{roomId}")
  .onUpdate(async change => {
    const {id} = change.after;
    const after = change.after.data() as Room.Response;
    const users = await db.collection(`rooms/${id}/members`).get();
    const promises = users.docs.map(user =>
      db.doc(`users/${user.id}/rooms/${id}`).update(after),
    );
    return Promise.all(promises);
  });

export default userRoomUpdate;
