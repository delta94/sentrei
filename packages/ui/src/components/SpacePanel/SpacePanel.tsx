import Box from "@material-ui/core/Box";

import * as React from "react";

import User from "@sentrei/types/models/User";
import SpacePanelAccordion from "@sentrei/ui/components/SpacePanelAccordion";
import SpacePanelBanner from "@sentrei/ui/components/SpacePanelBanner";
import SpacePanelStatus from "@sentrei/ui/components/SpacePanelStatus";

export interface Props {
  photo?: string | null;
  name: string;
  spaceId: string;
  user: User.Get;
}

export default function SpacePanel({
  photo,
  name,
  spaceId,
  user,
}: Props): JSX.Element {
  return (
    <>
      <SpacePanelBanner photo={photo} name={name} />
      <SpacePanelStatus spaceId={spaceId} user={user} />
      <Box py={2} />
      <SpacePanelAccordion spaceId={spaceId} />
    </>
  );
}
