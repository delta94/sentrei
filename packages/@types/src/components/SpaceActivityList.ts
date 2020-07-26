import Activity from "@sentrei/types/models/Activity";

export default interface Props {
  activityShot: Activity.Snapshot[];
  spaceId: string;
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
}
