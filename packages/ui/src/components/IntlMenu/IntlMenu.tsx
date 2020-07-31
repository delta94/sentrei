import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LanguageIcon from "@material-ui/icons/Language";

import Link from "next-translate/Link";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import * as React from "react";

export default function Header(): JSX.Element {
  const router = useRouter();
  const {lang} = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (language?: string): void => {
    if (language) {
      Router.pushI18n(router.pathname, undefined, {lang: language});
    }
    setAnchorEl(null);
  };

  const pathnameNoLang = (): string => {
    if (
      router.pathname === "/" ||
      router.pathname === "/ja" ||
      router.pathname === "/zh"
    ) {
      return "/";
    }
    return router.pathname
      .split("/")
      .filter(section => section !== lang)
      .join("/");
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
        <Link href={pathnameNoLang()} lang="en">
          <MenuItem>English</MenuItem>
        </Link>
        <Link href={pathnameNoLang()} lang="ja">
          <MenuItem>日本語</MenuItem>
        </Link>
        <Link href={pathnameNoLang()} lang="zh">
          <MenuItem>中文</MenuItem>
        </Link>
      </Menu>
    </>
  );
}
