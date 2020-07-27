/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {createInvite} from "@sentrei/common/firebase/invites";
import {timestamp} from "@sentrei/common/utils/firebase";
import Props from "@sentrei/types/components/InviteEmailForm";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

const InviteEmailForm = ({profile, user, spaceId}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const InviteEmailFormSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("auth:auth.email.required"))
      .email(t("auth:auth.email.valid")),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(InviteEmailFormSchema),
  });

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("invite:invite.editing"));
    try {
      await createInvite("spaces", spaceId, {
        createdAt: timestamp,
        createdBy: profile,
        createdByUid: user.uid,
        email: data.email,
        method: "email",
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
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            as={
              <TextField
                autoFocus
                fullWidth
                id="email"
                label={t("common:const.email")}
                margin="normal"
                name="email"
                required
                variant="outlined"
                error={!!errors.email}
                inputRef={register}
                helperText={errors.email ? errors.email.message : ""}
                type="text"
              />
            }
            name="email"
            control={control}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {t("invite:invite.invite")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default InviteEmailForm;
