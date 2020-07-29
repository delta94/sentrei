/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {updateProfile} from "@sentrei/common/firebase/profiles";

import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  profile: Profile.Get;
  user: User.Get;
}

const ProfileForm = ({profile}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();

  const ProfileFormSchema = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    photo: Yup.string(),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(ProfileFormSchema),
  });

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("common:snackbar.editing"));
    try {
      await updateProfile(
        {
          name: data.name,
        },
        profile.uid,
      )?.then(() => {
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
    <FormSection
      icon={<AddToPhotosIcon />}
      title={t("profile:profile.editProfile")}
    >
      <>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                as={
                  <TextField
                    autoFocus
                    fullWidth
                    id="room"
                    label={t("common:common.name")}
                    margin="normal"
                    name="name"
                    required
                    variant="outlined"
                    error={!!errors.name}
                    inputRef={register}
                    helperText={errors.name ? errors.name.message : ""}
                    type="text"
                  />
                }
                name="name"
                control={control}
                defaultValue={profile.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {t("common:common.edit")}
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
                {t("common:common.cancel")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    </FormSection>
  );
};

export default ProfileForm;
