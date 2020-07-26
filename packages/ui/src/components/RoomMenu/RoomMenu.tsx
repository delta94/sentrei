import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";
import Link from "next-translate/Link";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Props from "@sentrei/types/components/RoomMenu";

export default function RoomMenu({
  anchorEl,
  open,
  onClose,
  spaceId,
  roomId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      id="room-menu"
      keepMounted
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      <Link
        href="/[spaceId]/room/[roomId]/edit"
        as={`/${spaceId}/room/${roomId}/edit`}
      >
        <MenuItem>
          <ListItemIcon>
            <EditAttributesIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("room:room.editRoom")} />
        </MenuItem>
      </Link>
      <Link
        href="/[spaceId]/room/[roomId]/delete"
        as={`/${spaceId}/room/${roomId}/delete`}
      >
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("room:room.deleteRoom")} />
        </MenuItem>
      </Link>
    </Menu>
  );
}
