import Box from "@material-ui/core/Box";

import * as React from "react";

import SpacePanelAccordion from "@sentrei/ui/components/SpacePanelAccordion";
import SpacePanelBanner from "@sentrei/ui/components/SpacePanelBanner";
import SpacePanelStatus from "@sentrei/ui/components/SpacePanelStatus";

export interface Props {
  photo?: string | null;
  name: string;
  spaceId: string;
}

export default function SpacePanel({photo, name, spaceId}: Props): JSX.Element {
  return (
    <>
      <SpacePanelBanner photo={photo} name={name} />
      <SpacePanelStatus />
      <Box py={2} />
      <SpacePanelAccordion spaceId={spaceId} />
    </>
  );
}
