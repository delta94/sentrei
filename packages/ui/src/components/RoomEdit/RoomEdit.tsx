import Error from "next/error";
import * as React from "react";

import {getRoom} from "@sentrei/common/firebase/rooms";
import Props from "@sentrei/types/components/RoomEdit";
import Room from "@sentrei/types/models/Room";
import RoomForm from "@sentrei/ui/components/RoomForm";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export default function RoomEdit({
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
      type="edit"
      profile={profile}
      room={room}
      user={user}
      spaceId={spaceId}
    />
  );
}
