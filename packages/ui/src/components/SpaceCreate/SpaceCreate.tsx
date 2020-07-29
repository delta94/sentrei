import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import SpaceForm from "@sentrei/ui/components/SpaceForm";

export interface Props {
  profile: Profile.Get;
  user: User.Get;
}

export default function SpaceCreate({profile, user}: Props): JSX.Element {
  return <SpaceForm type="create" profile={profile} user={user} />;
}
