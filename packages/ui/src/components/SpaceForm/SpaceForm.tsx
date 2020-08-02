/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {validateSpaceMember} from "@sentrei/common/firebase/members";
import {
  createSpace,
  deleteSpaceMember,
  validateSpaceId,
} from "@sentrei/common/firebase/spaces";
import {timestamp} from "@sentrei/common/utils/firebase";
import sleep from "@sentrei/common/utils/sleep";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  profile: Profile.Get;
  space?: Space.Get;
  spaceId?: string;
  type: "create" | "quit";
  user: User.Get;
}

const SpaceForm = ({profile, space, type, user}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();

  const SpaceCreateSchema = Yup.object().shape({
    id: Yup.string()
      .required(t("form:id.idRequired"))
      .matches(/^[a-z0-9][a-z0-9_]*([.][a-z0-9_]+)*$/, t("form:id.idInvalid"))
      .test("id", t("form:id.idAlreadyUsed"), async value => {
        const result = await validateSpaceId(value);
        return result;
      }),
  });

  const QuitFormSchema = Yup.object().shape({
    quit: Yup.string()
      .required(t("space:space.quitRequired"))
      .oneOf(["QUIT"], t("space:space.quitTypeRequired")),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver:
      type === "create"
        ? yupResolver(SpaceCreateSchema)
        : yupResolver(QuitFormSchema),
  });

  async function goToSpace(spaceId: string): Promise<void> {
    try {
      if (await validateSpaceMember(spaceId, user.uid)) {
        Router.pushI18n("/[spaceId]", `/${spaceId}`);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  async function spaceLoop(spaceId: string): Promise<void> {
    await sleep(3000);
    goToSpace(spaceId);
    await sleep(3000);
    goToSpace(spaceId);
    await sleep(3000);
    goToSpace(spaceId);
    Router.pushI18n("/dashboard");
  }

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    switch (type) {
      case "create":
        snackbar("info", t("common:snackbar.creating"));
        try {
          await createSpace(
            {
              name: data.id,
              description: null,
              photo: null,
              createdAt: timestamp,
              createdBy: profile,
              createdByUid: user.uid,
              memberCount: 0,
              tier: "free",
              updatedAt: timestamp,
              updatedBy: profile,
              updatedByUid: user.uid,
            },
            data.id,
          )?.then(() => {
            snackbar("success");
            backdrop("loading");
            spaceLoop(data.id);
          });
        } catch (err) {
          snackbar("error", err.message);
        }
        break;
      case "quit":
        snackbar("info", t("common:snackbar.quiting"));
        try {
          if (!space) {
            return;
          }
          await deleteSpaceMember(space.id, user.uid)?.then(() => {
            snackbar("success");
            backdrop("loading");
            setTimeout(() => {
              Router.pushI18n("/dashboard");
            }, 1500);
          });
        } catch (err) {
          snackbar("error", err.message);
        }
        break;
      default:
    }
  };

  return (
    <>
      <FormSection
        icon={
          type === "create" ? (
            <AddToPhotosIcon />
          ) : type === "quit" ? (
            <ExitToAppIcon />
          ) : (
            <></>
          )
        }
        size={type === "create" ? "sm" : type === "quit" ? "xs" : "xs"}
        title={
          type === "create"
            ? t("space:space.createSpace")
            : type === "quit"
            ? t("space:space.quitSpace")
            : ""
        }
      />
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <Grid container spacing={3}>
          {type === "create" && (
            <Grid item xs={12}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={6}>
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    display="inline"
                    gutterBottom
                  >
                    sentrei.com/
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    as={
                      <TextField
                        fullWidth
                        id="space"
                        label={t("common:common.id")}
                        margin="normal"
                        name="id"
                        required
                        variant="outlined"
                        error={!!errors.id}
                        inputRef={register}
                        helperText={errors.id ? errors.id.message : ""}
                        type="text"
                      />
                    }
                    name="id"
                    control={control}
                    defaultValue=""
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          {type === "quit" && (
            <Grid item xs={12}>
              <Controller
                as={
                  <TextField
                    autoFocus
                    fullWidth
                    id="space-quit"
                    label="Type QUIT"
                    margin="normal"
                    name="quit"
                    required
                    variant="outlined"
                    error={!!errors.quit}
                    inputRef={register}
                    helperText={errors.quit ? errors.quit.message : ""}
                    type="text"
                  />
                }
                name="quit"
                control={control}
                defaultValue=""
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {type === "create" && t("common:common.create")}
              {type === "quit" && t("common:common.quit")}
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
  );
};

export default SpaceForm;
