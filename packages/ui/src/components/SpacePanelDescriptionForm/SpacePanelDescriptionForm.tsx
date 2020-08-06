/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";

import * as Yup from "yup";

import {updateMember} from "@sentrei/common/firebase/members";
import {timestamp} from "@sentrei/common/utils/firebase";
import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

import SpacePanelDescriptionFormStyles from "./SpacePanelDescriptionFormStyles";

export interface Props {
  profile: Profile.Get;
  member: Member.Get;
  spaceId: string;
  userId: string;
}

export default function SpacePanelDescriptionForm({
  member,
  profile,
  spaceId,
  userId,
}: Props): JSX.Element {
  const classes = SpacePanelDescriptionFormStyles();
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const [empty, setEmpty] = React.useState<boolean>(!member.description);

  const SpaceDescriptionFormSchema = Yup.object().shape({
    description: Yup.string(),
  });

  const {control, handleSubmit, reset} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(SpaceDescriptionFormSchema),
  });

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("common:snackbar.updating"));
    try {
      await updateMember("spaces", spaceId, userId, {
        description: data.description,
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: userId,
      });
      setEmpty(false);
      snackbar("success", t("common:snackbar.updated"));
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  const handleClear = async (): Promise<void> => {
    try {
      await updateMember("spaces", spaceId, userId, {
        description: "",
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: userId,
      });
      setEmpty(true);
      reset();
      snackbar("success", t("common:snackbar.updated"));
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      noValidate
    >
      <Controller
        as={
          <InputBase
            placeholder={t("common:common.writeYourStatus")}
            inputProps={{"aria-label": "write your status"}}
          />
        }
        name="description"
        control={control}
        defaultValue={member.description}
      />
      {empty ? (
        <IconButton
          className={classes.iconButton}
          type="submit"
          aria-label="return"
        >
          <KeyboardReturnIcon />
        </IconButton>
      ) : (
        <IconButton
          className={classes.iconButton}
          aria-label="clear"
          onClick={handleClear}
        >
          <HighlightOffIcon />
        </IconButton>
      )}
    </form>
  );
}
