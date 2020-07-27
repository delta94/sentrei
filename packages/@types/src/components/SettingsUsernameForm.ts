import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";

export default interface Props {
  profile: Profile.Get;
  user: User.Get;
}