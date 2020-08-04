import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";

import * as React from "react";

import SpacePanelAccordion from "@sentrei/ui/components/SpacePanelAccordion";

import SpacePanelStyles from "./SpacePanelStyles";

export interface Props {
  photo?: string | null;
  name: string;
  spaceId: string;
}

export default function SpacePanel({photo, name, spaceId}: Props): JSX.Element {
  const classes = SpacePanelStyles();

  return (
    <>
      <Box py={1} />
      <Container maxWidth="xs">
        <Grid container alignItems="center" justify="center" direction="row">
          {photo ? (
            <Avatar src={photo || undefined} className={classes.large} />
          ) : (
            <DashboardIcon color="disabled" className={classes.large} />
          )}
          <Box p={1} />
          <Typography variant="h2" component="h2" align="center">
            {name}
          </Typography>
        </Grid>
      </Container>
      <Box p={2}>
        <SpacePanelAccordion spaceId={spaceId} />
      </Box>
    </>
  );
}
