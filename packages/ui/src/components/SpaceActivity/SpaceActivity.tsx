import * as React from "react";

import {getActivitiesSnapshot} from "@sentrei/common/firebase/activity";
import Props from "@sentrei/types/components/SpaceActivity";
import Activity from "@sentrei/types/models/Activity";
import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SpaceActivityList from "@sentrei/ui/components/SpaceActivityList";

export default function SpaceActivity({spaceId}: Props): JSX.Element {
  const [activityShot, setActivityShot] = React.useState<Activity.Snapshot[]>();

  React.useEffect(() => {
    getActivitiesSnapshot({spaceId}).then(setActivityShot);
  }, [spaceId]);

  return (
    <>
      {activityShot ? (
        <SpaceActivityList
          activityShot={activityShot}
          last={activityShot[activityShot.length - 1]?.snap || 0}
          spaceId={spaceId}
        />
      ) : (
        <SkeletonList />
      )}
    </>
  );
}
