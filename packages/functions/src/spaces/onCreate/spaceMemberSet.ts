import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Member from "@sentrei/types/models/Member";
import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Set member on space create
 */
const spaceMemberSet = functions.firestore
  .document("spaces/{spaceId}")
  .onCreate(snap => {
    const data = snap.data() as Space.Response;
    const member: Member.Response = {
      createdAt: data.createdAt,
      createdBy: data.createdBy,
      createdByUid: data.createdByUid,
      photo: data.createdBy.photo,
      name: data.createdBy.name,
      joined: data.createdAt,
      role: "admin",
      roomId: null,
      spaceId: snap.id,
      status: "online",
      updatedAt: data.createdAt,
      username: data.createdBy.username,
      type: "spaces",
      uid: data.createdByUid,
      updatedBy: data.createdBy,
      updatedByUid: data.createdByUid,
    };

    return db.doc(`spaces/${snap.id}/members/${data.createdByUid}`).set(member);
  });

export default spaceMemberSet;
