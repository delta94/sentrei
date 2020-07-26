import Member from "@sentrei/types/models/Member";

export default interface MemberQuery {
  collection: Member.Collections;
  docId: string | undefined;
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
}
