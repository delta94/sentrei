import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EditIcon from "@material-ui/icons/Edit";
import HistoryIcon from "@material-ui/icons/History";
import SettingsIcon from "@material-ui/icons/Settings";
import Link from "next-translate/Link";
import * as React from "react";

import SpacePanelStyles from "./SpacePanelStyles";

export interface Props {
  photo?: string | null;
  name: string;
  spaceId: string;
}

export default function SpacePanel({photo, name, spaceId}: Props): JSX.Element {
  const classes = SpacePanelStyles();

  return (
    <Container maxWidth="xs">
      <Grid container alignItems="center" justify="flex-end" direction="row">
        <Grid item xs={5} sm={6} md={7} />
        <Grid item xs={7} sm={6} md={5}>
          <Link href="/[spaceId]/settings" as={`/${spaceId}/settings`}>
            <IconButton>
              <SettingsIcon color="action" />
            </IconButton>
          </Link>
          <Link href="/[spaceId]/activity" as={`/${spaceId}/activity`}>
            <IconButton>
              <HistoryIcon color="action" />
            </IconButton>
          </Link>
          <Link href="/[spaceId]/edit" as={`/${spaceId}/edit`}>
            <IconButton>
              <EditIcon color="primary" />
            </IconButton>
          </Link>
        </Grid>
      </Grid>
      <Box p={1}>
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
      </Box>
    </Container>
  );
}
