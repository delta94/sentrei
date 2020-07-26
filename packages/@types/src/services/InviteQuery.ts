import Invite from "@sentrei/types/models/Invite";

export default interface InviteQuery {
  collection: Invite.Collections;
  docId: string | undefined;
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
}
