/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {createInvite} from "@sentrei/common/firebase/invites";
import {timestamp} from "@sentrei/common/utils/firebase";
import Invite from "@sentrei/types/models/Invite";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  profile: Profile.Get;
  spaceId: string;
  user: User.Get;
}

const InviteLinkForm = ({profile, user, spaceId}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const [period, setPeriod] = React.useState<Invite.Period>("day");

  const handleChange = (event: React.ChangeEvent<{value: unknown}>): void => {
    setPeriod(event.target.value as Invite.Period);
  };

  const handleSubmit = async (): Promise<void> => {
    snackbar("info", t("invite:invite.editing"));
    try {
      await createInvite("spaces", spaceId, {
        createdAt: timestamp,
        createdBy: profile,
        createdByUid: user.uid,
        method: "link",
        period,
        spaceId,
        type: "spaces",
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: user.uid,
      })?.then(() => {
        snackbar("success");
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <Grid container direction="row" alignItems="center" spacing={3}>
      <Grid item xs={4}>
        <FormControl>
          <TextField
            fullWidth
            id="select"
            label="Period"
            select
            size="medium"
            variant="outlined"
            value={period}
            onChange={handleChange}
          >
            <MenuItem value="day">Day</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="never">Never</MenuItem>
          </TextField>
        </FormControl>
      </Grid>
      <Grid item xs={8}>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={(): Promise<void> => handleSubmit()}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export default InviteLinkForm;
