import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withWidth, {isWidthUp, isWidthDown} from "@material-ui/core/withWidth";
import * as React from "react";

import Tilt from "react-parallax-tilt";

import Props from "@sentrei/types/components/ProductCard";
import RoughNotation from "@sentrei/ui/components/RoughNotation";

import ProductStyles from "./ProductCardStyles";

function ProductCard({
  color,
  left,
  img,
  subTitle,
  titleOne,
  titleTwo,
  titleThree,
  type,
  width,
}: Props): JSX.Element {
  const classes = ProductStyles();

  const Picture = (
    <Grid item xs={false} sm={4} md={5}>
      <Box m={3}>
        <Tilt reset scale={1.1} transitionSpeed={2500} className={classes.tilt}>
          {img}
        </Tilt>
      </Box>
    </Grid>
  );

  return (
    <Grid container alignItems="center" justify="center" component="main">
      {left && Picture}
      {!left && isWidthDown("xs", width) && Picture}
      <Grid item xs={12} sm={8} md={7} className={classes.item}>
        <Box py={3} />
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {titleOne}
          <RoughNotation color={color} text={titleTwo} type={type} />
          {titleThree}
        </Typography>
        <Typography
          component="p"
          variant="h6"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          {subTitle}
        </Typography>
      </Grid>
      {!left && isWidthUp("sm", width) && Picture}
    </Grid>
  );
}

export default withWidth()(ProductCard);
