import Activity from "@sentrei/types/models/Activity";

export default interface Props {
  lastItem: string | firebase.firestore.DocumentSnapshot;
  length: number;
  limit: number;
  spaceId: string;
  onLoadMore: (posts: Activity.Get[]) => void;
}
