import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

export interface Props {
  anchorEl?: Element | ((element: Element) => Element) | null | undefined;
  open: boolean;
  onClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}

export default function ListMenu({
  anchorEl,
  open,
  onClose,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      id="list-menu"
      keepMounted
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      <MenuItem>
        <ListItemIcon>
          <AccessibilityNewIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("common:const.help")} />
      </MenuItem>
    </Menu>
  );
}
