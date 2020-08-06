import ButtonBase from "@material-ui/core/ButtonBase";
import Popover from "@material-ui/core/Popover";
import {Emoji, EmojiData} from "emoji-mart";
import {motion, useAnimation} from "framer-motion";
import * as React from "react";

import EmojiMart from "@sentrei/ui/components/EmojiMart";

import EmojiPickerStyles from "./EmojiPickerStyles";

export interface Props {
  initialEmoji: string;
  onSelect?: (emoji: string) => void;
}

export default function EmojiPicker({
  initialEmoji,
  onSelect,
}: Props): JSX.Element {
  const classes = EmojiPickerStyles();

  const controls = useAnimation();

  const [emoji, setEmoji] = React.useState<string>(initialEmoji);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleSelect = (e: EmojiData): void => {
    const emojiString = e.colons;
    setEmoji(emojiString ?? initialEmoji);
    controls.start({
      scale: [1, 1.2, 1.2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    });
    if (onSelect && emojiString) {
      onSelect(emojiString);
    }
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <ButtonBase
        aria-describedby={id}
        className={classes.iconButton}
        onClick={handleClick}
        aria-label="emoji"
      >
        <motion.span animate={controls}>
          <Emoji emoji={emoji} set="twitter" size={30} />
        </motion.span>
      </ButtonBase>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <EmojiMart onSelect={handleSelect} />
      </Popover>
    </>
  );
}
