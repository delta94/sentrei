import * as React from "react";

import {updateRoom} from "@sentrei/common/firebase/rooms";
import {timestamp} from "@sentrei/common/utils/firebase";
import Profile from "@sentrei/types/models/Profile";
import EmojiPicker from "@sentrei/ui/components/EmojiPicker";

import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  initialEmoji: string;
  profile: Profile.Get;
  roomId: string;
  userId: string;
}

export default function RoomCardEmojiPicker({
  initialEmoji,
  profile,
  roomId,
  userId,
}: Props): JSX.Element {
  const {snackbar} = useSnackbar();

  const handleEmoji = async (emoji: string): Promise<void> => {
    try {
      await updateRoom(
        {
          emoji,
          updatedAt: timestamp,
          updatedBy: profile,
          updatedByUid: userId,
        },
        roomId,
      );
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return <EmojiPicker initialEmoji={initialEmoji} onSelect={handleEmoji} />;
}
