import Error from "next/error";
import * as React from "react";

import {getMembersLive} from "@sentrei/common/firebase/members";
import {getRoomsLive} from "@sentrei/common/firebase/rooms";
import {getSpace} from "@sentrei/common/firebase/spaces";
import Member from "@sentrei/types/models/Member";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import MemberFab from "@sentrei/ui/components/MemberFab";
import SkeletonScreen from "@sentrei/ui/components/SkeletonScreen";
import SpaceBoard from "@sentrei/ui/components/SpaceBoard";
import SpaceFab from "@sentrei/ui/components/SpaceFab";

export interface Props {
  spaceId: string;
}

export default function SpaceScreen({spaceId}: Props): JSX.Element {
  const [space, setSpace] = React.useState<Space.Get | null | undefined>();
  const [members, setMembers] = React.useState<
    Member.Get[] | null | undefined
  >();
  const [rooms, setRooms] = React.useState<Room.Get[] | null | undefined>();

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

  React.useEffect(() => {
    const unsubscribe = getMembersLive("spaces", spaceId, snap => {
      setMembers(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [spaceId]);

  React.useEffect(() => {
    const unsubscribe = getRoomsLive(spaceId, snap => {
      setRooms(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [spaceId]);

  if (space === undefined || members === undefined || rooms === undefined) {
    return <SkeletonScreen />;
  }

  if (!space || !members) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      {members && <MemberFab members={members} space={space} />}
      {space && <SpaceFab spaceId={space.id} type="space" />}
      {space && members && (
        <SpaceBoard members={members} rooms={rooms} space={space} />
      )}
    </>
  );
}
