import Invite from "@sentrei/types/models/Invite";

export default interface Props {
  invites: Invite.Get[];
  type: Invite.Methods;
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
}
