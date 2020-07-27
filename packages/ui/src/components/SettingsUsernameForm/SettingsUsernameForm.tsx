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

import {
  createUsername,
  validateUsername,
} from "@sentrei/common/firebase/usernames";

import Props from "@sentrei/types/components/SettingsUsernameForm";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

const SettingsUsernameForm = ({profile}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();

  const SettingsUsernameFormSchema = Yup.object().shape({
    username: Yup.string()
      .required(t("settings:settings.usernameRequired"))
      .matches(
        /^[a-z0-9][a-z0-9_]*([.][a-z0-9_]+)*$/,
        t("settings:settings.usernameInvalid"),
      )
      .test("id", t("settings:settings.usernameAlreadyUsed"), async value => {
        const result = await validateUsername(value);
        return result;
      }),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(SettingsUsernameFormSchema),
  });

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("settings:profile.editing"));
    try {
      await createUsername(data.username, profile.uid)?.then(() => {
        snackbar("success");
        backdrop("loading");
        setTimeout(() => {
          Router.pushI18n("/dashboard");
        }, 300);
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
            defaultValue={profile.username}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {t("settings:profile.edit")}
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
            {t("settings:profile.cancel")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SettingsUsernameForm;
