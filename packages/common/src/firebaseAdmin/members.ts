import {serializeAdminMember} from "@sentrei/common/serializers/Member";
import adminDb from "@sentrei/common/utils/firebaseAdminDb";
import Member from "@sentrei/types/models/Member";
import MembersQuery from "@sentrei/types/services/MemberQuery";

export const memberAdminConverter: FirebaseFirestore.FirestoreDataConverter<Member.Get> = {
  toFirestore(data: Member.Get) {
    return data;
  },
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<Member.Response>,
  ): Member.Get {
    return serializeAdminMember(snapshot);
  },
};

export const membersAdminQuery = ({
  collection,
  docId,
  last,
  limit = 10,
}: MembersQuery): FirebaseFirestore.Query<Member.Get> => {
  let ref = adminDb()
    .collection(`${collection}/${docId}/members`)
    .withConverter(memberAdminConverter)
    .orderBy("xp", "desc")
    .limit(limit);

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getAdminMembers = async (
  query: MembersQuery,
): Promise<Member.Get[]> => {
  const ref = await membersAdminQuery(query).get();
  return ref.docs.map(doc => doc.data());
};
