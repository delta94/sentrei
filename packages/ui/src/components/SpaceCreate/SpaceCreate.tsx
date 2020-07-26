import * as React from "react";

import Props from "@sentrei/types/components/SpaceCreate";
import SpaceForm from "@sentrei/ui/components/SpaceForm";

export default function SpaceCreate({profile, user}: Props): JSX.Element {
  return <SpaceForm type="create" profile={profile} user={user} />;
}
