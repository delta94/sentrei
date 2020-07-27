/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {inviteMember} from "@sentrei/common/firebase/members";
import {getProfile} from "@sentrei/common/firebase/profiles";
import {validateUsername} from "@sentrei/common/firebase/usernames";
import {timestamp} from "@sentrei/common/utils/firebase";

import Props from "@sentrei/types/components/InviteLinkForm";
import Member from "@sentrei/types/models/Member";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

const InviteLinkForm = ({profile, user, spaceId}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const InviteLinkFormSchema = Yup.object().shape({
    username: Yup.string()
      .required(t("invite:invite.usernameRequired"))
      // .matches(
      //   /^[a-z0-9][a-z0-9_]*([.][a-z0-9_]+)*$/,
      //   t("invite:invite.usernameInvalid"),
      // )
      .test("id", t("invite:invite.usernameNotExist"), async value => {
        const result = await validateUsername(value);
        return !result;
      }),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(InviteLinkFormSchema),
  });

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("invite:invite.editing"));
    try {
      const memberProfile = await getProfile(data.username);
      if (memberProfile) {
        const member: Member.Create = {
          createdAt: timestamp,
          createdBy: profile,
          createdByUid: user.uid,
          name: memberProfile.name,
          photo: memberProfile.photo,
          status: "offline",
          type: "spaces",
          role: "viewer",
          roomId: null,
          spaceId,
          updatedAt: timestamp,
          updatedBy: profile,
          updatedByUid: user.uid,
          uid: memberProfile.uid,
          username: memberProfile.username,
        };
        await inviteMember("spaces", spaceId, memberProfile.uid, member)?.then(
          () => {
            snackbar("success");
          },
        );
      }
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            as={
              <TextField
                autoFocus
                fullWidth
                id="username"
                label={t("common:const.username")}
                margin="normal"
                name="username"
                required
                variant="outlined"
                error={!!errors.username}
                inputRef={register}
                helperText={errors.username ? errors.username.message : ""}
                type="text"
              />
            }
            name="username"
            control={control}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {t("invite:invite.invite")}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="reset"
            fullWidth
            variant="outlined"
            color="primary"
            onClick={(): void => Router.back()}
          >
            {t("invite:invite.cancel")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default InviteLinkForm;
