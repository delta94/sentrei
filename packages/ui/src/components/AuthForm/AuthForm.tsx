/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import "@sentrei/common/utils/sentry";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import * as React from "react";
import "firebase/auth";
import {useForm, Controller} from "react-hook-form";

import * as Yup from "yup";

import signin from "@sentrei/common/services/signin";
import signinWithGoogle from "@sentrei/common/services/signinWithGoogle";
import signup from "@sentrei/common/services/signup";

import {auth} from "@sentrei/common/utils/firebase";
import FormSection from "@sentrei/ui/components/FormSection";
import Link from "@sentrei/ui/components/Link";

import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

import AuthFormStyles from "./AuthFormStyles";

export interface Props {
  type: "login" | "reset" | "signup";
}

export default function AuthForm({type}: Props): JSX.Element {
  const classes = AuthFormStyles();
  const {backdrop} = useBackdrop();
  const {snackbar} = useSnackbar();
  const {t, lang} = useTranslation();
  const {query} = useRouter();

  const AuthFormSchema = Yup.object().shape({
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
        : yupResolver(AuthFormSchema),
  });

  const google = (): void => {
    snackbar("info", t("common:snackbar.loading"));
    signinWithGoogle(lang)
      .then(() => {
        snackbar("dismiss");
        if (query.redirect) {
          Router.pushI18n(String(query.redirect));
        }
      })
      .catch(err => snackbar("error", err.message));
  };

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("common:snackbar.loading"));

    switch (type) {
      case "reset":
        try {
          await auth.sendPasswordResetEmail(data.email).catch(err => {
            snackbar("error", err.message);
          });
          snackbar("success", t("auth:auth.email.check"));
        } catch (err) {
          snackbar("error", err.message);
        }
        backdrop("dismiss");
        break;
      case "login":
        try {
          signin(data.email, data.password, lang)
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
        backdrop("dismiss");
        break;
      case "signup":
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
        backdrop("dismiss");
        break;
      default:
    }
  };

  return (
    <Box pt={3}>
      <FormSection
        icon={
          type === "reset" ? (
            <MailOutlinedIcon />
          ) : type === "login" ? (
            <LockOutlinedIcon />
          ) : type === "signup" ? (
            <AccountCircleOutlinedIcon />
          ) : (
            <></>
          )
        }
        title={
          type === "reset"
            ? t("auth:resetPassword.title")
            : type === "login"
            ? t("auth:login.title")
            : type === "signup"
            ? t("auth:signup.title")
            : ""
        }
        size="sm"
      >
        <Grid container spacing={3}>
          <Box p={1} />
          {type !== "reset" && (
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
              <Typography>
                {type === "login" && t("auth:login.google")}
                {type === "signup" && t("auth:signup.google")}
              </Typography>
            </Button>
          )}
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
                  label={t("common:common.email")}
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
            {type === "login" || type === "signup" ? (
              <Controller
                as={
                  <TextField
                    autoComplete="current-password"
                    fullWidth
                    id="password"
                    label={t("common:common.password")}
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
            ) : null}
            {type === "login" || type === "signup" ? (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={t("auth:auth.rememberMe")}
              />
            ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {type === "reset" && t("auth:resetPassword.button")}
              {type === "login" && t("auth:login.button")}
              {type === "signup" && t("auth:signup.button")}
            </Button>
          </form>
          {type === "login" && (
            <Grid container>
              <Grid item xs>
                <Link href="/reset-password" variant="body2">
                  {t("auth:login.forgotPassword")}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {t("auth:login.dontHaveSignup")}
                </Link>
              </Grid>
            </Grid>
          )}
          {type === "signup" && (
            <>
              <Grid container justify="center">
                <Grid item>
                  <Link href="/login" variant="body2">
                    {t("auth:signup.alreadyHaveLogin")}
                  </Link>
                </Grid>
              </Grid>
              <Box p={1} />
              <Grid container justify="center">
                <Grid item>
                  <Link href="/terms" variant="body2">
                    {t("auth:signup.byAgreeTerms")}
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </FormSection>
    </Box>
  );
}
