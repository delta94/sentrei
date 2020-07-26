/* eslint-disable @typescript-eslint/no-non-null-assertion */

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Room from "@sentrei/types/models/Room";

export const serializeRoom = (
  snap: firebase.firestore.DocumentSnapshot<Room.Response>,
): Room.Get => {
  const data = snap.data()!;
  const {joined} = data;

  return {
    ...data,
    createdAt: data.createdAt,
    id: snap.id,
    joined: serializeFirebaseDate(joined),
    updatedAt: data.updatedAt,
  };
};

export const serializeAdminRoom = (
  snap: FirebaseFirestore.DocumentSnapshot<Room.Response>,
): Room.Get => {
  const data = snap.data()!;
  const {joined} = data;

  return {
    ...data,
    createdAt: data.createdAt,
    id: snap.id,
    joined: serializeFirebaseDate(joined),
    updatedAt: data.updatedAt,
  };
};
