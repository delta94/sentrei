import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import "@sentrei/web/styles/slider.scss";
import {useInView} from "react-intersection-observer";

import {analytics} from "@sentrei/common/utils/firebase";
import RoughNotation from "@sentrei/ui/components/RoughNotation";
import KeioPicture from "@sentrei/web/images/png/KeioPicture";
import UclPicture from "@sentrei/web/images/png/UclPicture";

export default function SentreiSlider(): JSX.Element {
  const {t} = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      analytics().logEvent("index:landing", {section: "slider"});
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <Box p={4} />
      <Container maxWidth="md">
        <Typography align="center" variant="h4">
          {t("index:slider.titleOne")}
          <RoughNotation
            color="secondary-light"
            text={t("index:slider.titleTwo")}
            type="highlight"
          />
          {t("index:slider.titleThree")}
        </Typography>
      </Container>
      <Box p={3} />
      <div className="slider">
        <div className="slide-track">
          <div className="slide">
            <KeioPicture />
          </div>
          <div className="slide">
            <UclPicture />
          </div>
          <div className="slide">
            <KeioPicture />
          </div>
          <div className="slide">
            <UclPicture />
          </div>
          <div className="slide">
            <KeioPicture />
          </div>
          <div className="slide">
            <UclPicture />
          </div>
          <div className="slide">
            <KeioPicture />
          </div>
          <div className="slide">
            <UclPicture />
          </div>
          <div className="slide">
            <KeioPicture />
          </div>
          <div className="slide">
            <UclPicture />
          </div>
          <div className="slide">
            <KeioPicture />
          </div>
          <div className="slide">
            <UclPicture />
          </div>
          <div className="slide">
            <KeioPicture />
          </div>
          <div className="slide">
            <UclPicture />
          </div>
        </div>
      </div>
    </div>
  );
}
