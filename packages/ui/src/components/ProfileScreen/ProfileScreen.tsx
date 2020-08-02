import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import FormSection from "@sentrei/ui/components/FormSection";

import ProfileScreenStyles from "./ProfileScreenStyles";

export interface Props {
  profile: Profile.Get;
}

export default function ProfileScreen({profile}: Props): JSX.Element {
  const classes = ProfileScreenStyles();
  const {t} = useTranslation();

  return (
    <>
      <FormSection
        icon={<AccountCircleIcon />}
        title={t("common:common.profile")}
        size="sm"
      />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <Avatar
            alt="profile"
            src={profile.photo || undefined}
            className={classes.large}
          />
        </Grid>
        <Grid item>
          <Typography component="h1" variant="h3" color="textSecondary">
            {profile.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography noWrap component="h5" variant="h6" color="textSecondary">
            {t("common:common.username")}
            {": "}
            {profile.username}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
