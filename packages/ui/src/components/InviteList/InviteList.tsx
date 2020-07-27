import Grid from "@material-ui/core/Grid";
import * as React from "react";

import Props from "@sentrei/types/components/InviteList";
import InviteCard from "@sentrei/ui/components/InviteCard";

export default function InviteList({invites}: Props): JSX.Element {
  return (
    <>
      {invites.map(invite => (
        <Grid item key={invite.id} xs={12}>
          <InviteCard invite={invite} />
        </Grid>
      ))}
    </>
  );
}
