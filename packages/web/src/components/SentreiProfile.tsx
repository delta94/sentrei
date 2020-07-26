import * as React from "react";

import Props from "@sentrei/types/components/Profile";
import Profile from "@sentrei/ui/components/Profile";

export default function SentreiProfile({userEmail}: Props): JSX.Element {
  return <Profile userEmail={userEmail} />;
}
