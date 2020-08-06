import * as React from "react";

import {updateMemberEmoji} from "@sentrei/common/firebase/members";
import EmojiPicker from "@sentrei/ui/components/EmojiPicker";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  spaceId: string;
  userId: string;
}

export default function SpacePanelEmojiPicker({
  spaceId,
  userId,
}: Props): JSX.Element {
  const {snackbar} = useSnackbar();

  const handleEmoji = (emoji: string): void => {
    try {
      updateMemberEmoji("spaces", spaceId, userId, emoji);
    } catch (err) {
      snackbar("error", err);
    }
  };

  return <EmojiPicker emoji="monkey" onSelect={handleEmoji} />;
}
