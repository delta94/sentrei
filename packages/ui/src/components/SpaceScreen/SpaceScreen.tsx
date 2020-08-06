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
  profile: Profile.Get;
  spaceId: string;
  user: User.Get;
}

export default function SpaceScreen({
  profile,
  spaceId,
  user,
}: Props): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [space, setSpace] = React.useState<Space.Get | null | undefined>();
  const [member, setMember] = React.useState<Member.Get | null | undefined>();
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

  React.useEffect(() => {
    if (members) {
      setMember(members.filter(doc => doc.uid === profile.uid)[0]);
    }
  }, [members, profile]);

  if (space === undefined || members === undefined || rooms === undefined) {
    return <SkeletonScreen />;
  }

  if (!space || !members || !member) {
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
