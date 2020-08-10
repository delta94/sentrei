import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";

import Link from "next-translate/Link";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import Scrollspy from "react-scrollspy";

import DarkModeButton from "@sentrei/ui/components/DarkModeButton";

import Logo from "@sentrei/ui/components/Logo";
import PaperCups from "@sentrei/ui/components/PaperCups";

import HeaderStyles from "./HeaderStyles";

export interface Props {
  logo: JSX.Element;
  sign?: boolean;
  spy?: boolean;
}

export default function Header({
  logo,
  sign = true,
  spy = true,
}: Props): JSX.Element {
  const classes = HeaderStyles();
  const {t} = useTranslation();

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes.transparent]: true,
    [classes.paper]: false,
  });

  const headerColorChange = (): void => {
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > 0) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes.transparent);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes.paper);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes.transparent);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes.paper);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", headerColorChange);
    return function cleanup(): void {
      window.removeEventListener("scroll", headerColorChange);
    };
  });

  return (
    <>
      <PaperCups />
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
                  <IconButton edge="end">
                    <DarkModeButton />
                  </IconButton>
                </Grid>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton edge="end">
                  <DarkModeButton />
                </IconButton>
              </div>
            </Grid>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </div>
    </>
  );
}
