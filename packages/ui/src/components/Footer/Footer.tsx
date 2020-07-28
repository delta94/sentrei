/* eslint-disable no-script-url */

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import linkedin from "react-useanimations/lib/linkedin";
import twitter from "react-useanimations/lib/twitter";

import metomic from "@sentrei/common/services/metomic";
import Copyright from "@sentrei/ui/components/Copyright";
import Link from "@sentrei/ui/components/Link";
import Metomic from "@sentrei/ui/components/Metomic";

import FooterStyles from "./FooterStyles";

export default function Footer(): JSX.Element {
  const classes = FooterStyles();
  const {t} = useTranslation();

  return (
    <>
      <Metomic />
      <footer className={classes.footer}>
        <Container maxWidth="md" component="footer" className={classes.footer}>
          <Grid container justify="space-evenly">
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                {t("index:footer.product")}
              </Typography>
              <MuiLink href="https://github.com/sentrei/sentrei/releases">
                <Typography gutterBottom>
                  {t("index:footer.releases")}
                </Typography>
              </MuiLink>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                {t("index:footer.legal")}
              </Typography>
              <MuiLink onClick={(): void => metomic()}>
                <Typography gutterBottom>
                  {t("index:footer.cookies")}
                </Typography>
              </MuiLink>
              <Link href="/privacy">
                <Typography gutterBottom>
                  {t("index:footer.privacy")}
                </Typography>
              </Link>
              <Link href="/terms">
                <Typography gutterBottom>{t("index:footer.terms")}</Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                {t("index:footer.social")}
              </Typography>
              <Grid container direction="row" spacing={3}>
                <Grid item>
                  <MuiLink href="https://github.com/sentrei/sentrei">
                    <Avatar aria-label="github" variant="rounded">
                      <UseAnimations animation={github} />
                    </Avatar>
                  </MuiLink>
                </Grid>
                <Grid item>
                  <MuiLink href="https://linkedin.com/company/sentrei">
                    <Avatar aria-label="linkedin" variant="rounded">
                      <UseAnimations animation={linkedin} />
                    </Avatar>
                  </MuiLink>
                </Grid>
                <Grid item>
                  <MuiLink href="https://twitter.com/sentrei_com">
                    <Avatar aria-label="twitter" variant="rounded">
                      <UseAnimations animation={twitter} />
                    </Avatar>
                  </MuiLink>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3} justify="space-evenly" />
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </footer>
    </>
  );
}
