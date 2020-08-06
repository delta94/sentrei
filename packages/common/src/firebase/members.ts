import {serializeMember} from "@sentrei/common/serializers/Member";
import {db} from "@sentrei/common/utils/firebase";
import Member from "@sentrei/types/models/Member";
import MemberQuery from "@sentrei/types/services/MemberQuery";

export const memberConverter: firebase.firestore.FirestoreDataConverter<Member.Get> = {
  toFirestore(data: Member.Get) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Member.Response>,
  ): Member.Get {
    return serializeMember(snapshot);
  },
};

export const MembersQuery = ({
  collection,
  docId,
  last,
  limit = 10,
}: MemberQuery): firebase.firestore.Query<Member.Get> => {
  let ref = db
    .collection(`${collection}/${docId}/members`)
    .orderBy("updatedAt", "desc")
    .withConverter(memberConverter)
    .limit(limit);

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getMembers = async (query: MemberQuery): Promise<Member.Get[]> => {
  const ref = await MembersQuery(query).get();
  return ref.docs.map(doc => doc.data());
};

export const getMembersLive = (
  collection: Member.Collections,
  docId: string,
  onSnapshot: (snap: Member.Get[]) => void,
): firebase.Unsubscribe => {
  return db
    .collection(`${collection}/${docId}/members`)
    .orderBy("updatedAt", "desc")
    .withConverter(memberConverter)
    .onSnapshot(snap => {
      const data = snap.docs.map(member => member.data());
      onSnapshot(data);
    });
};

export const getSpaceMember = async (
  spaceId: string,
  userId: string,
): Promise<Member.Get | null> => {
  const snap = await db
    .doc(`spaces/${spaceId}/members/${userId}`)
    .withConverter(memberConverter)
    .get();

  return snap.data() || null;
};

export const validateSpaceMember = async (
  spaceId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const member = await db.doc(`spaces/${spaceId}/members/${userId}`).get();
    return member.exists;
  } catch {
    return false;
  }
};

export const getMembersSnapshot = async (
  query: MemberQuery,
): Promise<Member.Snapshot[]> => {
  const ref = await MembersQuery(query).get();
  return ref.docs.map(snap => ({...snap.data(), snap}));
};

export const inviteMember = (
  collection: Member.Collections,
  docId: string,
  userId: string,
  member: Member.Create,
): Promise<void> => {
  return db.doc(`${collection}/${docId}/members/${userId}`).set(member);
};

export const deleteMember = (
  collection: Member.Collections,
  docId: string,
  userId: string,
): Promise<void> => {
  return db.doc(`${collection}/${docId}/members/${userId}`).delete();
};

export const updateMember = (
  collection: Member.Collections,
  docId: string,
  userId: string,
  member: Member.Update,
): Promise<void> => {
  return db.doc(`${collection}/${docId}/members/${userId}`).update(member);
};
