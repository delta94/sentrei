import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";

export default interface Props {
  profile: Profile.Get;
  space?: Space.Get;
  spaceId?: string;
  type: "create" | "edit" | "quit";
  user: User.Get;
}
