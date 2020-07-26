import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LanguageIcon from "@material-ui/icons/Language";
import classNames from "classnames";

import Link from "next-translate/Link";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import Scrollspy from "react-scrollspy";

import Props from "@sentrei/types/components/Header";
import HubSpot from "@sentrei/ui/components/HubSpot";
import IntlMenu from "@sentrei/ui/components/IntlMenu";
import Logo from "@sentrei/ui/components/Logo";

import HeaderStyles from "./HeaderStyles";

export default function Header({
  logo,
  sign = true,
  spy = true,
}: Props): JSX.Element {
  const classes = HeaderStyles();
  const {t} = useTranslation();
  const mobileMenuId = "primary-search-account-menu-mobile";

  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleClose = (language?: string): void => {
    if (language) {
      Router.pushI18n({url: "/", options: {lang: language}});
    }
  };

  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes.transparent]: true,
    [classes.primary]: false,
  });

  const headerColorChange = (): void => {
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > 0) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes.transparent);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes.primary);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes.transparent);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes.primary);
    }
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{vertical: "top", horizontal: "right"}}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{vertical: "top", horizontal: "right"}}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={(): void => handleClose("en")}>English</MenuItem>
      <MenuItem onClick={(): void => handleClose("ja")}>日本語</MenuItem>
      <MenuItem onClick={(): void => handleClose("zh")}>中文</MenuItem>
    </Menu>
  );

  React.useEffect(() => {
    window.addEventListener("scroll", headerColorChange);
    return function cleanup(): void {
      window.removeEventListener("scroll", headerColorChange);
    };
  });

  return (
    <>
      <HubSpot />
      <div className={classes.grow}>
        <AppBar position="fixed" className={appBarClasses}>
          <Toolbar>
            <Grid container alignItems="center" justify="center">
              <Logo logo={logo} href="/" />
              <div className={classes.spy}>
                <Grid item>
                  <Hidden smDown implementation="css">
                    {spy && (
                      <Scrollspy
                        items={[
                          "product",
                          "feature",
                          "testimonial",
                          "pricing",
                          "faq",
                        ]}
                        currentClassName="scroll-active-button"
                      >
                        <Button href="#product" className={classes.button}>
                          <Typography>{t("index:header.product")}</Typography>
                        </Button>
                        <Button href="#testimonial" className={classes.button}>
                          <Typography>
                            {t("index:header.testimonial")}
                          </Typography>
                        </Button>
                        <Button href="#pricing" className={classes.button}>
                          <Typography>{t("index:header.pricing")}</Typography>
                        </Button>
                        <Button href="#faq" className={classes.button}>
                          <Typography>{t("index:header.faq")}</Typography>
                        </Button>
                      </Scrollspy>
                    )}
                  </Hidden>
                </Grid>
              </div>
              <div className={classes.sectionDesktop}>
                <Grid item>
                  {sign && (
                    <>
                      <Link href="/login">
                        <Button
                          color="primary"
                          variant="outlined"
                          className={classes.margin}
                        >
                          <Typography>{t("index:header.login")}</Typography>
                        </Button>
                      </Link>
                      <Link href="/signup">
                        <Button
                          color="primary"
                          variant="contained"
                          className={classes.margin}
                        >
                          <Typography>{t("index:header.signup")}</Typography>
                        </Button>
                      </Link>
                    </>
                  )}
                  <IntlMenu />
                </Grid>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  edge="end"
                  aria-controls={mobileMenuId}
                  aria-label="menu"
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                >
                  <LanguageIcon />
                </IconButton>
              </div>
            </Grid>
          </Toolbar>
        </AppBar>
        <div>{renderMobileMenu}</div>
        <Toolbar />
      </div>
    </>
  );
}
