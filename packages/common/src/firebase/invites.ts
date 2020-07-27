import {serializeInvite} from "@sentrei/common/serializers/Invite";
import {db} from "@sentrei/common/utils/firebase";
import Invite from "@sentrei/types/models/Invite";
import InviteQuery from "@sentrei/types/services/InviteQuery";

export const inviteConverter: firebase.firestore.FirestoreDataConverter<Invite.Get> = {
  toFirestore(data: Invite.Get) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Invite.Response>,
  ): Invite.Get {
    return serializeInvite(snapshot);
  },
};

export const InvitesQuery = ({
  collection,
  docId,
  last,
  limit = 10,
}: InviteQuery): firebase.firestore.Query<Invite.Get> => {
  let ref = db
    .collection(`${collection}/${docId}/invites`)
    .withConverter(inviteConverter)
    .limit(limit);

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getInvites = async (query: InviteQuery): Promise<Invite.Get[]> => {
  const ref = await InvitesQuery(query).get();
  return ref.docs.map(doc => doc.data());
};

export const getInvitesLive = (
  collection: Invite.Collections,
  docId: string,
  onSnapshot: (snap: Invite.Get[]) => void,
): firebase.Unsubscribe => {
  return db
    .collection(`${collection}/${docId}/invites`)
    .orderBy("updatedAt", "desc")
    .withConverter(inviteConverter)
    .onSnapshot(snap => {
      const data = snap.docs.map(invite => invite.data());
      onSnapshot(data);
    });
};

export const validateSpaceInvite = async (
  spaceId: string,
  inviteId: string,
): Promise<boolean> => {
  const invite = await db.doc(`spaces/${spaceId}/invites/${inviteId}`).get();
  return invite.exists;
};

export const getInvitesSnapshot = async (
  query: InviteQuery,
): Promise<Invite.Snapshot[]> => {
  const ref = await InvitesQuery(query).get();
  return ref.docs.map(snap => ({...snap.data(), snap}));
};

export const createInvite = async (
  collection: Invite.Collections,
  docId: string,
  invite: Invite.Create,
): Promise<void> => {
  await db.collection(`${collection}/${docId}/invites`).add(invite);
};

export const deleteInvite = (
  collection: Invite.Collections,
  docId: string,
  inviteId: string,
): Promise<void> => {
  return db.doc(`${collection}/${docId}/invites/${inviteId}`).delete();
};
