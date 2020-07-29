import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import * as React from "react";

import ListMenu from "@sentrei/ui/components/ListMenu";
import Logo from "@sentrei/ui/components/Logo";
import ProfileMenu from "@sentrei/ui/components/ProfileMenu";

import AppHeaderStyles from "./AppHeaderStyles";

export interface Props {
  logo: JSX.Element;
  spaceId?: string;
}

export default function AppHeader({logo, spaceId}: Props): JSX.Element {
  const classes = AppHeaderStyles();

  const [listAnchorEl, listSetAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const [
    profileAnchorEl,
    profileSetAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>): void => {
    profileSetAnchorEl(event.currentTarget);
  };

  const handleListClick = (event: React.MouseEvent<HTMLElement>): void => {
    listSetAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    listSetAnchorEl(null);
    profileSetAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            aria-controls="list-menu"
            aria-haspopup="true"
            onClick={handleListClick}
            className={classes.left}
          >
            {listAnchorEl ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <ListMenu
            anchorEl={listAnchorEl}
            open={Boolean(listAnchorEl)}
            onClose={handleClose}
          />
          <Grid container alignItems="center" justify="center">
            <Logo
              logo={logo}
              as={spaceId ? `/${spaceId}` : "/dashboard"}
              href={spaceId ? "/[spaceId]" : "/dashboard"}
            />
          </Grid>
          <IconButton
            edge="end"
            aria-label="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileClick}
            className={classes.right}
          >
            {profileAnchorEl ? <CloseIcon /> : <PermIdentityIcon />}
          </IconButton>
          <ProfileMenu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleClose}
          />
        </Toolbar>
      </AppBar>
    </>
  );
}
