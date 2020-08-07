import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {quitRoom} from "@sentrei/common/firebase/rooms";
import QuitForm from "@sentrei/ui/components/QuitForm";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

interface Props {
  roomId: string;
  userId: string;
}

const RoomQuitForm = ({roomId, userId}: Props): JSX.Element => {
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();
  const {t} = useTranslation();

  const onSubmit = async (): Promise<void> => {
    snackbar("info", t("common:snackbar.deleting"));
    try {
      await quitRoom(roomId, userId)?.then(() => {
        snackbar("success");
        backdrop("loading");
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return <QuitForm id={roomId} onSubmit={onSubmit} />;
};

export default RoomQuitForm;
