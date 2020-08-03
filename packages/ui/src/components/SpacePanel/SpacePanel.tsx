import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HistoryIcon from "@material-ui/icons/History";
import PeopleIcon from "@material-ui/icons/People";
import PollIcon from "@material-ui/icons/Poll";
import Link from "next-translate/Link";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import SpacePanelStyles from "./SpacePanelStyles";

export interface Props {
  photo?: string | null;
  name: string;
  spaceId: string;
}

export default function SpacePanel({photo, name, spaceId}: Props): JSX.Element {
  const classes = SpacePanelStyles();
  const {t} = useTranslation();

  return (
    <>
      <Box py={1} />
      <Container maxWidth="md">
        <Grid
          container
          alignItems="center"
          justify="flex-end"
          direction="row"
          spacing={3}
        >
          <Grid item xs={6} sm={6} md={3}>
            <Link href="/[spaceId]/activity" as={`/${spaceId}/activity`}>
              <Button
                fullWidth
                variant="outlined"
                color="default"
                startIcon={<HistoryIcon />}
              >
                {t("common:common.activity")}
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <Link href="/[spaceId]/analytics" as={`/${spaceId}/analytics`}>
              <Button
                fullWidth
                variant="outlined"
                color="default"
                startIcon={<PollIcon />}
              >
                {t("common:common.analytics")}
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <Link href="/[spaceId]/leaderboard" as={`/${spaceId}/leaderboard`}>
              <Button
                fullWidth
                variant="outlined"
                color="default"
                startIcon={<FormatListNumberedIcon />}
              >
                {t("common:common.leaderboard")}
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <Link href="/[spaceId]/members" as={`/${spaceId}/members`}>
              <Button
                fullWidth
                variant="outlined"
                color="default"
                startIcon={<PeopleIcon />}
              >
                {t("common:common.members")}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
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
    </>
  );
}
