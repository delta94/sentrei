import * as React from "react";

import {getMembersLive} from "@sentrei/common/firebase/members";
import Member from "@sentrei/types/models/Member";
import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SpaceMemberList from "@sentrei/ui/components/SpaceMemberList";

export interface Props {
  spaceId: string;
}

export default function SpaceMember({spaceId}: Props): JSX.Element {
  const [members, setMembers] = React.useState<
    Member.Get[] | null | undefined
  >();

  React.useEffect(() => {
    const unsubscribe = getMembersLive("spaces", spaceId, snap => {
      setMembers(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [spaceId]);

  return (
    <>{members ? <SpaceMemberList members={members} /> : <SkeletonList />}</>
  );
}
