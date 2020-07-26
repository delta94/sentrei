import Container from "@material-ui/core/Container";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Section from "@sentrei/ui/components/Section";

import FaqStyles from "./FaqStyles";

export default function Faq(): JSX.Element {
  const classes = FaqStyles();
  const {t} = useTranslation();

  return (
    <>
      <Section title={t("index:faq.sectionTitle")} subTitle="" />
      <Container maxWidth="md" component="main">
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className={classes.heading}>
              {t("index:faq.titleOne")}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t("index:faq.bodyOne")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6" className={classes.heading}>
              {t("index:faq.titleTwo")}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t("index:faq.bodyTwo")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography variant="h6" className={classes.heading}>
              {t("index:faq.titleThree")}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t("index:faq.bodyThree")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Container>
    </>
  );
}
