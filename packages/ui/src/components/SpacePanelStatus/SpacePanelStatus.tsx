import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import GitHubIcon from "@material-ui/icons/GitHub";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import SpacePanelEmojiPicker from "@sentrei/ui/components/SpacePanelEmojiPicker";

import SpacePanelStatusStyles from "./SpacePanelStatusStyles";

export interface Props {
  profile: Profile.Get;
  member: Member.Get;
  spaceId: string;
  user: User.Get;
}

export default function SpacePanelStatus({
  member,
  profile,
  spaceId,
  user,
}: Props): JSX.Element {
  const classes = SpacePanelStatusStyles();

  return (
    <Container maxWidth="md">
      <Grid container alignItems="center" justify="center" spacing={3}>
        <Grid item xs={12} sm={1} md={2} />
        <Grid item xs={12} sm={10} md={8}>
          <Paper component="form" className={classes.root}>
            <SpacePanelEmojiPicker
              profile={profile}
              initialEmoji={member.emoji ?? "joy"}
              spaceId={spaceId}
              userId={user.uid}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <InputBase
              className={classes.input}
              placeholder="Write your status"
              inputProps={{"aria-label": "write your emoji"}}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <KeyboardReturnIcon />
            </IconButton>
            <IconButton
              color="primary"
              className={classes.iconButton}
              aria-label="directions"
            >
              <GitHubIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={1} md={2} />
      </Grid>
    </Container>
  );
}
