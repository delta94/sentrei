import Error from "next/error";
import * as React from "react";

import {getSpace} from "@sentrei/common/firebase/spaces";
import Props from "@sentrei/types/components/RoomCreate";
import Space from "@sentrei/types/models/Space";
import RoomForm from "@sentrei/ui/components/RoomForm";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export default function RoomCreate({
  profile,
  spaceId,
  user,
}: Props): JSX.Element {
  const [space, setSpace] = React.useState<Space.Get | null | undefined>();

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

  if (space === undefined) {
    return <SkeletonForm />;
  }

  if (space === null) {
    return <Error statusCode={404} />;
  }

  return (
    <RoomForm type="create" profile={profile} user={user} spaceId={spaceId} />
  );
}
