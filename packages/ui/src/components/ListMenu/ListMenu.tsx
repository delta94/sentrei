import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "next-translate/Link";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {getSpaces} from "@sentrei/common/firebase/spaces";
import Space from "@sentrei/types/models/Space";

export interface Props {
  anchorEl?: Element | ((element: Element) => Element) | null | undefined;
  open: boolean;
  onClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  userId?: string;
}

export default function ListMenu({
  anchorEl,
  open,
  onClose,
  userId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [spaces, setSpaces] = React.useState<Space.Get[]>();

  React.useEffect(() => {
    if (userId) {
      getSpaces({userId}).then(setSpaces);
    }
  }, [userId]);

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
      <MenuItem disabled>
        <ListItemText primary={t("space:space.mySpaces")} />
      </MenuItem>
      {spaces &&
        spaces.map(space => (
          <Link key={space.id} href="/[spaceId]" as={`/${space.id}`}>
            <MenuItem>
              <ListItemIcon>
                <Avatar src={space.photo || undefined} />
              </ListItemIcon>
              <ListItemText primary={space.name} />
            </MenuItem>
          </Link>
        ))}
    </Menu>
  );
}
