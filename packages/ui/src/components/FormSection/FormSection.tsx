import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import * as React from "react";

import Props from "@sentrei/types/components/FormSection";

import FormSectionStyles from "./FormSectionStyles";

export default function FormSection({
  children,
  icon,
  size = "xs",
  title,
}: Props): JSX.Element {
  const classes = FormSectionStyles();

  return (
    <Container component="main" maxWidth={size}>
      <div className={classes.paper}>
        <Box p={3}>
          <Avatar className={classes.avatar}>{icon}</Avatar>
        </Box>
        <Typography component="h1" variant="h3">
          {title}
        </Typography>
        <Box p={3}>{children}</Box>
      </div>
    </Container>
  );
}
