import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";

export default interface Props {
  user: User.Get;
  profile: Profile.Get;
  spaceId: string;
  roomId: string;
}
