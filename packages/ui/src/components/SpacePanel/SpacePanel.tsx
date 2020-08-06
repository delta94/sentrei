import Box from "@material-ui/core/Box";

import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import SpacePanelAccordion from "@sentrei/ui/components/SpacePanelAccordion";
import SpacePanelBanner from "@sentrei/ui/components/SpacePanelBanner";
import SpacePanelStatus from "@sentrei/ui/components/SpacePanelStatus";

export interface Props {
  photo?: string | null;
  name: string;
  profile: Profile.Get;
  spaceId: string;
  user: User.Get;
}

export default function SpacePanel({
  name,
  profile,
  photo,
  spaceId,
  user,
}: Props): JSX.Element {
  return (
    <>
      <SpacePanelBanner photo={photo} name={name} />
      <SpacePanelStatus profile={profile} spaceId={spaceId} user={user} />
      <Box py={2} />
      <SpacePanelAccordion spaceId={spaceId} />
    </>
  );
}
