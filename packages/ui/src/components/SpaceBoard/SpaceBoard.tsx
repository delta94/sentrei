import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import * as React from "react";

import Props from "@sentrei/types/components/SpaceBoard";
import RoomCard from "@sentrei/ui/components/RoomCard";
import RoomNone from "@sentrei/ui/components/RoomNone";
import SpacePanel from "@sentrei/ui/components/SpacePanel";

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
