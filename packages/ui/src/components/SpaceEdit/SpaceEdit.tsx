import Error from "next/error";
import * as React from "react";

import {getSpace} from "@sentrei/common/firebase/spaces";
import Props from "@sentrei/types/components/SpaceEdit";
import Space from "@sentrei/types/models/Space";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SpaceForm from "@sentrei/ui/components/SpaceForm";

export default function SpaceEdit({
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

  return <SpaceForm type="edit" profile={profile} space={space} user={user} />;
}
