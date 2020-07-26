import * as React from "react";

import Original from "@sentrei/types/components/AppHeader";
import AppHeader from "@sentrei/ui/components/AppHeader";
import LogoPicture from "@sentrei/web/images/png/LogoPicture";

type Props = Omit<Original, "logo">;

export default function SentreiAppHeader({spaceId}: Props): JSX.Element {
  return <AppHeader logo={<LogoPicture />} spaceId={spaceId} />;
}
