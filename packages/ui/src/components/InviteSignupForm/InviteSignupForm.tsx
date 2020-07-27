/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import * as React from "react";
import "firebase/auth";
import {useForm, Controller} from "react-hook-form";

import * as Yup from "yup";

import signinWithGoogle from "@sentrei/common/services/signinWithGoogle";
import signup from "@sentrei/common/services/signup";

import Props from "@sentrei/types/components/Auth";
import FormSection from "@sentrei/ui/components/FormSection";
import Link from "@sentrei/ui/components/Link";

import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

import InviteSignupFormStyles from "./InviteSignupFormStyles";

export default function InviteSignupForm({type}: Props): JSX.Element {
  const classes = InviteSignupFormStyles();
  const {backdrop} = useBackdrop();
  const {snackbar} = useSnackbar();
  const {t, lang} = useTranslation();
  const {query} = useRouter();

  const InviteSignupFormSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("auth:auth.email.required"))
      .email(t("auth:auth.email.valid")),
    password: Yup.string().required(t("auth:auth.password.valid")),
  });

  const ResetFormSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("auth:auth.email.required"))
      .email(t("auth:auth.email.valid")),
  });

  const {control, register, errors, handleSubmit} = useForm({
    reValidateMode: "onChange",
    resolver:
      type === "reset"
        ? yupResolver(ResetFormSchema)
        : yupResolver(InviteSignupFormSchema),
  });

  const google = (): void => {
    snackbar("info", t("common:const.loading"));
    signinWithGoogle(lang)
      .then(() => {
        snackbar("dismiss");
        if (query.redirect) {
          Router.pushI18n(String(query.redirect));
        }
      })
      .catch(err => snackbar("error", err.message));
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("common:const.loading"));
    try {
      signup(data.email, data.password, lang)
        .then(() => {
          backdrop("loading");
          if (query.redirect) {
            Router.pushI18n(String(query.redirect));
          }
        })
        .catch(err => {
          snackbar("error", err.message);
        });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <Box pt={3}>
      <FormSection
        icon={<AccountCircleOutlinedIcon />}
        title={t("auth:signup.title")}
        size="sm"
      >
        <Grid container spacing={3}>
          <Box p={1} />
          <Button
            onClick={(): void => google()}
            color="primary"
            variant="outlined"
            className={classes.button}
          >
            <img
              width="20px"
              alt="Google sign-in"
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              className={classes.google}
            />
            <Typography>{t("auth:signup.google")}</Typography>
          </Button>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.form}
            autoComplete="off"
            noValidate
          >
            <Controller
              as={
                <TextField
                  autoComplete="email"
                  autoFocus
                  fullWidth
                  id="email"
                  label={t("common:const.email")}
                  margin="normal"
                  name="email"
                  placeholder="example@sentrei.com"
                  required
                  variant="outlined"
                  error={!!errors.email}
                  inputRef={register}
                  helperText={errors.email ? errors.email.message : ""}
                />
              }
              name="email"
              control={control}
              defaultValue=""
            />
            <Controller
              as={
                <TextField
                  autoComplete="current-password"
                  fullWidth
                  id="password"
                  label={t("common:const.password")}
                  margin="normal"
                  name="password"
                  required
                  type="password"
                  variant="outlined"
                  error={!!errors.password}
                  inputRef={register}
                  helperText={errors.password ? errors.password.message : ""}
                />
              }
              name="password"
              control={control}
              defaultValue=""
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t("auth:auth.remember-me")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {type === "reset" && t("auth:reset-password.button")}
              {type === "login" && t("auth:login.button")}
              {type === "signup" && t("auth:signup.button")}
            </Button>
          </form>
          <Grid container justify="center">
            <Grid item>
              <Link href="/login" variant="body2">
                {t("auth:signup.already-have-login")}
              </Link>
            </Grid>
          </Grid>
          <Box p={1} />
          <Grid container justify="center">
            <Grid item>
              <Link href="/terms" variant="body2">
                {t("auth:signup.by-agree-terms")}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </FormSection>
    </Box>
  );
}
