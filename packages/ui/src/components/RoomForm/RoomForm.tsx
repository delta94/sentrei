/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import DeleteIcon from "@material-ui/icons/Delete";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {
  createRoom,
  deleteRoom,
  updateRoom,
} from "@sentrei/common/firebase/rooms";

import {timestamp} from "@sentrei/common/utils/firebase";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  profile: Profile.Get;
  type: "create" | "edit" | "delete";
  user: User.Get;
  room?: Room.Get;
  spaceId: string;
}

const RoomForm = ({profile, room, type, user, spaceId}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();

  const RoomCreateSchema = Yup.object().shape({
    name: Yup.string().required(t("room:room.nameRequired")),
  });

  const RoomEditSchema = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    photo: Yup.string(),
  });

  const DeleteFormSchema = Yup.object().shape({
    delete: Yup.string()
      .required(t("room:room.deleteRequired"))
      .oneOf(["DELETE"], t("room:room.deleteTypeRequired")),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver:
      type === "create"
        ? yupResolver(RoomCreateSchema)
        : type === "edit"
        ? yupResolver(RoomEditSchema)
        : yupResolver(DeleteFormSchema),
  });

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    switch (type) {
      case "create":
        snackbar("info", t("common.snackbar.creating"));
        try {
          if (!spaceId) {
            return;
          }
          await createRoom({
            name: data.name,
            description: null,
            photo: null,
            createdAt: timestamp,
            createdBy: profile,
            createdByUid: user.uid,
            memberCount: 0,
            spaceId,
            updatedAt: timestamp,
            updatedBy: profile,
            updatedByUid: user.uid,
          })?.then(() => {
            snackbar("success");
            backdrop("loading");
            setTimeout(() => {
              Router.pushI18n("/[spaceId]", `/${spaceId}`);
            }, 1500);
          });
        } catch (err) {
          snackbar("error", err.message);
        }
        break;
      case "edit":
        snackbar("info", t("common:snackbar.editing"));
        try {
          if (!room || !spaceId) {
            return;
          }
          await updateRoom(
            {
              name: data.name,
              description: data.description,
              photo: null,
              updatedAt: timestamp,
              updatedBy: profile,
              updatedByUid: user.uid,
            },
            room.id,
          )?.then(() => {
            snackbar("success");
            backdrop("loading");
            setTimeout(() => {
              Router.pushI18n("/[spaceId]", `/${spaceId}`);
            }, 300);
          });
        } catch (err) {
          snackbar("error", err.message);
        }
        break;
      case "delete":
        snackbar("info", t("common:snackbar.deleting"));
        try {
          if (!room || !spaceId) {
            return;
          }
          await deleteRoom(room.id)?.then(() => {
            snackbar("success");
            backdrop("loading");
            setTimeout(() => {
              Router.pushI18n("/[spaceId]", `/${spaceId}`);
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
    <FormSection
      icon={
        type === "create" ? (
          <AddToPhotosIcon />
        ) : type === "edit" ? (
          <AddToPhotosIcon />
        ) : type === "delete" ? (
          <DeleteIcon />
        ) : (
          <></>
        )
      }
      title={
        type === "create"
          ? t("room:room.createRoom")
          : type === "edit"
          ? t("room:room.editRoom")
          : type === "delete"
          ? t("room:room.deleteRoom")
          : ""
      }
      size="sm"
    >
      <>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
          <Grid container spacing={3}>
            {type === "create" && (
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
                  defaultValue=""
                />
              </Grid>
            )}
            {type === "edit" && (
              <Grid item xs={12}>
                <Controller
                  as={
                    <TextField
                      autoFocus
                      fullWidth
                      id="room-name"
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
                  defaultValue={room?.name}
                />
              </Grid>
            )}
            {type === "edit" && (
              <Grid item xs={12}>
                <Controller
                  as={
                    <TextField
                      fullWidth
                      multiline
                      rows={1}
                      id="room-description"
                      label={t("common:common.description")}
                      margin="normal"
                      name="description"
                      required
                      variant="outlined"
                      error={!!errors.description}
                      inputRef={register}
                      helperText={
                        errors.description ? errors.description.message : ""
                      }
                      type="text"
                    />
                  }
                  name="description"
                  control={control}
                  defaultValue={room?.description}
                />
              </Grid>
            )}
            {type === "delete" && (
              <Grid item xs={12}>
                <Controller
                  as={
                    <TextField
                      autoFocus
                      fullWidth
                      id="room-delete"
                      label="Type DELETE"
                      margin="normal"
                      name="delete"
                      required
                      variant="outlined"
                      error={!!errors.delete}
                      inputRef={register}
                      helperText={errors.delete ? errors.delete.message : ""}
                      type="text"
                    />
                  }
                  name="delete"
                  control={control}
                  defaultValue=""
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {type === "create" && t("common:common.create")}
                {type === "edit" && t("common:common.edit")}
                {type === "delete" && t("common:common.delete")}
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

export default RoomForm;
