import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import RoomCard from "@sentrei/ui/components/RoomCard";
import RoomNone from "@sentrei/ui/components/RoomNone";
import SpacePanel from "@sentrei/ui/components/SpacePanel";

export interface Props {
  members: Member.Get[];
  rooms: Room.Get[] | null;
  space: Space.Get;
}

export default function SpaceBoard({rooms, space}: Props): JSX.Element {
  return (
    <>
      <SpacePanel photo={space.photo} name={space.name} spaceId={space.id} />
      <Box py={2} />
      <Container maxWidth="lg" component="main">
        <Grid container alignItems="center" justify="center" spacing={3}>
          {rooms?.length === 0 && <RoomNone spaceId={space.id} />}
          {rooms &&
            rooms.map(room => (
              <Grid item key={room.id} xs={12} sm={6} md={4}>
                <RoomCard room={room} space={space} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}
