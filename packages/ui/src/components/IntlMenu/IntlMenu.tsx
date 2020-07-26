import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LanguageIcon from "@material-ui/icons/Language";

import Router from "next-translate/Router";
import * as React from "react";

export default function Header(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (language?: string): void => {
    if (language) {
      Router.pushI18n("/", undefined, {lang: language});
    }
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        edge="end"
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(): void => handleClose()}
      >
        <MenuItem onClick={(): void => handleClose("en")}>English</MenuItem>
        <MenuItem onClick={(): void => handleClose("ja")}>日本語</MenuItem>
        <MenuItem onClick={(): void => handleClose("zh")}>中文</MenuItem>
      </Menu>
    </>
  );
}
