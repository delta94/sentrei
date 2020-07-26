/* eslint-disable @typescript-eslint/no-non-null-assertion */

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Space from "@sentrei/types/models/Space";

export const serializeSpace = (
  snap: firebase.firestore.DocumentSnapshot<Space.Response>,
): Space.Get => {
  const data = snap.data()!;
  const {joined} = data;

  return {
    ...data,
    inviteCount: data.inviteCount as number,
    memberCount: data.memberCount as number,
    createdAt: data.createdAt,
    id: snap.id,
    joined: serializeFirebaseDate(joined),
    updatedAt: data.updatedAt,
  };
};

export const serializeAdminSpace = (
  snap: FirebaseFirestore.DocumentSnapshot<Space.Response>,
): Space.Get => {
  const data = snap.data()!;
  const {joined} = data;

  return {
    ...data,
    inviteCount: data.inviteCount as number,
    memberCount: data.memberCount as number,
    createdAt: data.createdAt,
    id: snap.id,
    joined: serializeFirebaseDate(joined),
    updatedAt: data.updatedAt,
  };
};
