import ButtonBase from "@material-ui/core/ButtonBase";
import Popover from "@material-ui/core/Popover";
import {Emoji} from "emoji-mart";
import * as React from "react";

import EmojiMart from "@sentrei/ui/components/EmojiMart";

import EmojiPickerStyles from "./EmojiPickerStyles";

export default function EmojiPicker(): JSX.Element {
  const classes = EmojiPickerStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
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
        <Emoji emoji="santa" set="twitter" size={30} />
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
        <EmojiMart />
      </Popover>
    </>
  );
}
