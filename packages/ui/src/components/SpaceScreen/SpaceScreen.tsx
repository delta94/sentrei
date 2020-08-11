import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Error from "next/error";
import * as React from "react";

import {getMembersLive} from "@sentrei/common/firebase/members";
import {getRoomsLive} from "@sentrei/common/firebase/rooms";
import {getSpace} from "@sentrei/common/firebase/spaces";
import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import MemberFab from "@sentrei/ui/components/MemberFab";
import SkeletonScreen from "@sentrei/ui/components/SkeletonScreen";
import SpaceBoard from "@sentrei/ui/components/SpaceBoard";
import SpaceFab from "@sentrei/ui/components/SpaceFab";

export interface Props {
  user: User.Get;
  profile: Profile.Get;
  memberData: Member.Get;
  membersData: Member.Get[];
  roomsData: Room.Get[];
  spaceData: Space.Get;
  spaceId: string;
}

export default function SpaceScreen({
  user,
  profile,
  memberData,
  membersData,
  roomsData,
  spaceData,
  spaceId,
}: Props): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [space, setSpace] = React.useState<Space.Get | null | undefined>(
    spaceData,
  );
  const [member, setMember] = React.useState<Member.Get | null | undefined>(
    memberData,
  );
  const [members, setMembers] = React.useState<Member.Get[] | null | undefined>(
    membersData,
  );
  const [rooms, setRooms] = React.useState<Room.Get[] | null | undefined>(
    roomsData,
  );

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

  React.useEffect(() => {
    if (members) {
      setMember(members.filter(doc => doc.uid === profile.uid)[0]);
    }
  }, [members, profile]);

  if (space === undefined || members === undefined || rooms === undefined) {
    return <SkeletonScreen />;
  }

  if (!space || !members) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      {members && matches && <MemberFab members={members} space={space} />}
      {space && <SpaceFab spaceId={space.id} type="space" />}
      {space && members && member && (
        <SpaceBoard
          member={member}
          members={members}
          profile={profile}
          rooms={rooms}
          space={space}
          user={user}
        />
      )}
    </>
  );
}
