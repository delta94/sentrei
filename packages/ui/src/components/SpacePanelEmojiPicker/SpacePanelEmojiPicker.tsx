import * as React from "react";

import {updateMember} from "@sentrei/common/firebase/members";
import {timestamp} from "@sentrei/common/utils/firebase";
import Profile from "@sentrei/types/models/Profile";
import EmojiPicker from "@sentrei/ui/components/EmojiPicker";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  profile: Profile.Get;
  spaceId: string;
  userId: string;
}

export default function SpacePanelEmojiPicker({
  profile,
  spaceId,
  userId,
}: Props): JSX.Element {
  const {snackbar} = useSnackbar();

  const handleEmoji = async (emoji: string): Promise<void> => {
    try {
      await updateMember("spaces", spaceId, userId, {
        emoji,
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: userId,
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return <EmojiPicker emoji="monkey" onSelect={handleEmoji} />;
}
