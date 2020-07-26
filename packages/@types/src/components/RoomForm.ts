import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";

export default interface Props {
  profile: Profile.Get;
  type: "create" | "edit" | "delete";
  user: User.Get;
  room?: Room.Get;
  spaceId: string;
}
