import Invite from "@sentrei/types/models/Invite";

export default interface Props {
  invite: Invite.Get;
  type: Invite.Methods;
}
