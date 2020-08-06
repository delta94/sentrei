import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";

import * as React from "react";

import SpacePanelBannerStyles from "./SpacePanelBannerStyles";

export interface Props {
  photo?: string | null;
  name: string;
}

export default function SpacePanelBanner({photo, name}: Props): JSX.Element {
  const classes = SpacePanelBannerStyles();

  return (
    <Container maxWidth="xs">
      <Grid container alignItems="center" justify="center" direction="row">
        {photo ? (
          <Avatar src={photo || undefined} className={classes.large} />
        ) : (
          <DashboardIcon color="disabled" className={classes.large} />
        )}
        <Box p={2}>
          <Typography variant="h2" component="h2" align="center">
            {name}
          </Typography>
        </Box>
      </Grid>
    </Container>
  );
}
