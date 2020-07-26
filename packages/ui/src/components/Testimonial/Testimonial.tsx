import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Props from "@sentrei/types/components/Testimonial";
import Section from "@sentrei/ui/components/Section";
import TestimonialCard from "@sentrei/ui/components/TestimonialCard";

export default function Testimonial({
  imgOne,
  imgTwo,
  imgThree,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <Section title={t("index:testimonial.sectionTitle")} subTitle="" />
      <Container maxWidth="lg" component="main">
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12} sm={4}>
            <TestimonialCard
              img={imgOne}
              author={t("index:testimonial.authorOne")}
              body={t("index:testimonial.bodyOne")}
              occupation={t("index:testimonial.occupationOne")}
              title={t("index:testimonial.titleOne")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TestimonialCard
              img={imgTwo}
              author={t("index:testimonial.authorTwo")}
              body={t("index:testimonial.bodyTwo")}
              occupation={t("index:testimonial.occupationTwo")}
              title={t("index:testimonial.titleTwo")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TestimonialCard
              img={imgThree}
              author={t("index:testimonial.authorThree")}
              body={t("index:testimonial.bodyThree")}
              occupation={t("index:testimonial.occupationThree")}
              title={t("index:testimonial.titleThree")}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
