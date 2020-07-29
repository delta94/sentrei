import Error from "next/error";
import * as React from "react";

import {getRoom} from "@sentrei/common/firebase/rooms";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import RoomForm from "@sentrei/ui/components/RoomForm";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  profile: Profile.Get;
  roomId: string;
  spaceId: string;
  user: User.Get;
}

export default function RoomDelete({
  profile,
  roomId,
  spaceId,
  user,
}: Props): JSX.Element {
  const [room, setRoom] = React.useState<Room.Get | null | undefined>();

  React.useEffect(() => {
    getRoom(roomId).then(setRoom);
  }, [roomId]);

  if (room === undefined) {
    return <SkeletonForm />;
  }

  if (room === null) {
    return <Error statusCode={404} />;
  }

  return (
    <RoomForm
      type="delete"
      profile={profile}
      room={room}
      user={user}
      spaceId={spaceId}
    />
  );
}
