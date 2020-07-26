import Container from "@material-ui/core/Container";
import AssessmentIcon from "@material-ui/icons/Assessment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Props from "@sentrei/types/components/Screen";
import TabBoard from "@sentrei/ui/components/TabBoard";

export default function Screen({imgOne, imgTwo, imgThree}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="md" component="main">
      <TabBoard
        tabIconOne={<HomeWorkIcon />}
        tabIconTwo={<FavoriteIcon />}
        tabIconThree={<AssessmentIcon />}
        tabLabelOne={t("index:screen.labelOne")}
        tabLabelTwo={t("index:screen.labelTwo")}
        tabLabelThree={t("index:screen.labelThree")}
        tabPanelOne={imgOne}
        tabPanelTwo={imgTwo}
        tabPanelThree={imgThree}
      />
    </Container>
  );
}
