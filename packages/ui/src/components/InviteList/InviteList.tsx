import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import * as React from "react";

import Props from "@sentrei/types/components/InviteList";
import InviteCard from "@sentrei/ui/components/InviteCard";

import InviteListStyles from "./InviteListStyles";

export default function InviteList({invites, type}: Props): JSX.Element {
  const classes = InviteListStyles();

  const emailInvites = invites.filter(invite => invite.method === "email");
  const linkInvites = invites.filter(invite => invite.method === "link");

  return (
    <List className={classes.list}>
      {type === "email" &&
        emailInvites.map(invite => (
          <Grid item key={invite.id} xs={12}>
            <InviteCard invite={invite} type="email" />
          </Grid>
        ))}
      {type === "link" &&
        linkInvites.map(invite => (
          <Grid item key={invite.id} xs={12}>
            <InviteCard invite={invite} type="link" />
          </Grid>
        ))}
    </List>
  );
}
