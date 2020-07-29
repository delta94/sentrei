import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import FeatureCard from "@sentrei/ui/components/FeatureCard";
import Section from "@sentrei/ui/components/Section";

import FeatureStyles from "./FeatureStyles";

export interface Props {
  imgOne: JSX.Element;
  imgTwo: JSX.Element;
  imgThree: JSX.Element;
}

export default function Feature({
  imgOne,
  imgTwo,
  imgThree,
}: Props): JSX.Element {
  const classes = FeatureStyles();
  const {t} = useTranslation();

  return (
    <>
      <Section title={t("index:feature.sectionTitle")} subTitle="" />
      <Container maxWidth="md" component="main">
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="stretch"
          className={classes.container}
        >
          <Grid item xs={12} sm={4}>
            <FeatureCard
              img={imgOne}
              title={t("index:feature.titleOne")}
              subTitle={t("index:feature.subTitleOne")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard
              img={imgTwo}
              title={t("index:feature.titleTwo")}
              subTitle={t("index:feature.subTitleTwo")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard
              img={imgThree}
              title={t("index:feature.titleThree")}
              subTitle={t("index:feature.subTitleThree")}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
