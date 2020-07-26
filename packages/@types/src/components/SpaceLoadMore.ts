import Space from "@sentrei/types/models/Space";

export default interface Props {
  lastItem: string | firebase.firestore.DocumentSnapshot;
  length: number;
  limit: number;
  userId?: string;
  onLoadMore: (posts: Space.Get[]) => void;
}
