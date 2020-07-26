import Space from "@sentrei/types/models/Space";

export default interface Props {
  spaceShot: Space.Snapshot[];
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
  userId?: string;
}
