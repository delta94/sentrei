import * as React from "react";

import {getSpacesSnapshot} from "@sentrei/common/firebase/spaces";
import Props from "@sentrei/types/components/SpaceDashboard";
import Space from "@sentrei/types/models/Space";

import SkeletonScreen from "@sentrei/ui/components/SkeletonScreen";
import SpaceFab from "@sentrei/ui/components/SpaceFab";
import SpaceList from "@sentrei/ui/components/SpaceList";

export default function SpaceDashboard({user}: Props): JSX.Element {
  const [spaceShot, setSpaceShot] = React.useState<Space.Snapshot[]>();

  React.useEffect(() => {
    if (user) {
      getSpacesSnapshot({userId: user.uid}).then(setSpaceShot);
    }
  }, [user]);

  if (!spaceShot) return <SkeletonScreen />;

  return (
    <>
      <SpaceFab type="dashboard" />
      <SpaceList
        spaceShot={spaceShot}
        last={spaceShot[spaceShot.length - 1]?.snap || 0}
        userId={user.uid}
      />
    </>
  );
}
