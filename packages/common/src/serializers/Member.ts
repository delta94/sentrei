/* eslint-disable @typescript-eslint/no-non-null-assertion */

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Member from "@sentrei/types/models/Member";

export const serializeMember = (
  snap: firebase.firestore.DocumentSnapshot<Member.Response>,
): Member.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    joined: serializeFirebaseDate(data.joined),
  };
};

export const serializeAdminMember = (
  snap: FirebaseFirestore.DocumentSnapshot<Member.Response>,
): Member.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    joined: serializeFirebaseDate(data.joined),
  };
};
