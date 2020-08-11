/* eslint-disable no-script-url */

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import linkedin from "react-useanimations/lib/linkedin";
import twitter from "react-useanimations/lib/twitter";

import metomic from "@sentrei/common/services/metomic";
import FooterCopyright from "@sentrei/ui/components/FooterCopyright";
import FooterCredits from "@sentrei/ui/components/FooterCredits";
import IntlForm from "@sentrei/ui/components/IntlForm";
import Metomic from "@sentrei/ui/components/Metomic";
import MuiLink from "@sentrei/ui/components/MuiLink";

import FooterStyles from "./FooterStyles";

export default function Footer(): JSX.Element {
  const classes = FooterStyles();
  const {t} = useTranslation();

  return (
    <>
      <Metomic />
      <footer className={classes.footer}>
        <Container maxWidth="lg" component="footer" className={classes.footer}>
          <Grid container justify="space-evenly">
            <Grid item xs={12} sm={3} md={2}>
              <Typography variant="h6" gutterBottom>
                {t("index:footer.company")}
              </Typography>
              <MuiLink href="/team">
                <Typography gutterBottom>{t("index:footer.team")}</Typography>
              </MuiLink>
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <Typography variant="h6" gutterBottom>
                {t("index:footer.legal")}
              </Typography>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link onClick={(): void => metomic()}>
                <Typography gutterBottom>
                  {t("index:footer.cookies")}
                </Typography>
              </Link>
              <MuiLink href="/privacy">
                <Typography gutterBottom>
                  {t("index:footer.privacy")}
                </Typography>
              </MuiLink>
              <MuiLink href="/terms">
                <Typography gutterBottom>{t("index:footer.terms")}</Typography>
              </MuiLink>
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <Typography variant="h6" gutterBottom>
                {t("index:footer.product")}
              </Typography>
              <Link href="https://github.com/sentrei/sentrei/releases">
                <Typography gutterBottom>
                  {t("index:footer.releases")}
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <Typography variant="h6" gutterBottom>
                {t("index:footer.preferences")}
              </Typography>
              <IntlForm />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <Typography variant="h6" gutterBottom>
                {t("index:footer.social")}
              </Typography>
              <Grid container direction="row" spacing={3}>
                <Grid item>
                  <Link href="https://github.com/sentrei/sentrei">
                    <Avatar aria-label="github" variant="rounded">
                      <UseAnimations animation={github} />
                    </Avatar>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="https://linkedin.com/company/sentrei">
                    <Avatar aria-label="linkedin" variant="rounded">
                      <UseAnimations animation={linkedin} />
                    </Avatar>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="https://twitter.com/sentrei_com">
                    <Avatar aria-label="twitter" variant="rounded">
                      <UseAnimations animation={twitter} />
                    </Avatar>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box m={3}>
            <FooterCredits />
          </Box>
          <Box mt={3}>
            <FooterCopyright />
          </Box>
        </Container>
      </footer>
    </>
  );
}
