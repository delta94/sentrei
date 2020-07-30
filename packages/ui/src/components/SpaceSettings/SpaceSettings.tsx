import Error from "next/error";
import * as React from "react";

import {getSpace} from "@sentrei/common/firebase/spaces";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SpaceForm from "@sentrei/ui/components/SpaceForm";

export interface Props {
  profile: Profile.Get;
  spaceId: string;
  user: User.Get;
}

export default function SpaceSettings({
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
