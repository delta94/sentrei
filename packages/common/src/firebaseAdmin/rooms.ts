import {
  serializeRoom,
  serializeAdminRoom,
} from "@sentrei/common/serializers/Room";
import adminDb from "@sentrei/common/utils/firebaseAdminDb";
import Room from "@sentrei/types/models/Room";
import RoomQuery from "@sentrei/types/services/RoomQuery";

export const roomConverter: firebase.firestore.FirestoreDataConverter<Room.Get> = {
  toFirestore(data: Room.Get) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Room.Response>,
  ): Room.Get {
    return serializeRoom(snapshot);
  },
};

export const roomAdminConverter: FirebaseFirestore.FirestoreDataConverter<Room.Get> = {
  toFirestore(data: Room.Get) {
    return data;
  },
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<Room.Response>,
  ): Room.Get {
    return serializeAdminRoom(snapshot);
  },
};

export const getAdminRoom = async (
  roomId: string | undefined,
): Promise<Room.Get | null> => {
  if (!roomId) {
    return null;
  }

  const snap = await adminDb()
    .doc(`rooms/${roomId}`)
    .withConverter(roomAdminConverter)
    .get();

  return snap.data() || null;
};

export const roomsAdminQuery = ({
  limit = 10,
  last,
  spaceId,
}: RoomQuery): FirebaseFirestore.Query<Room.Get> => {
  const collection = spaceId ? `spaces/${spaceId}/rooms` : "rooms";
  let ref = adminDb()
    .collection(collection)
    .withConverter(roomAdminConverter)
    .orderBy("updatedAt", "desc")
    .limit(limit);

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getAdminRooms = async (query: RoomQuery): Promise<Room.Get[]> => {
  const ref = await roomsAdminQuery(query).get();
  return ref.docs.map(doc => doc.data());
};
