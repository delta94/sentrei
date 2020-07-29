import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Profile from "@sentrei/types/models/Profile";

import ProfileScreenStyles from "./ProfileScreenStyles";

export interface Props {
  profile: Profile.Get;
}

export default function ProfileScreen({profile}: Props): JSX.Element {
  const classes = ProfileScreenStyles();
  const {t} = useTranslation();

  return (
    <Container maxWidth="md" component="main">
      <div className={classes.paper}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Box p={1} />
          <Typography component="h3" variant="h3" color="primary">
            {t("common:common.profile")}
          </Typography>
        </Grid>
      </div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <Avatar
            alt="Remy Sharp"
            src={profile.photo || undefined}
            className={classes.large}
          />
        </Grid>
        <Grid item>
          <Typography component="h1" variant="h3">
            {profile.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography noWrap component="h5" variant="h6" color="textSecondary">
            {t("common:common.id")}
            {": "}
            {profile.username}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
