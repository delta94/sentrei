import * as React from "react";

import Profile, {Props} from "@sentrei/ui/components/Profile";

export default function SentreiProfile({userEmail}: Props): JSX.Element {
  return <Profile userEmail={userEmail} />;
}
