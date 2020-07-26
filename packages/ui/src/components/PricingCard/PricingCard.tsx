import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import Props from "@sentrei/types/components/PricingCard";

import PricingCardStyles from "./PricingCardStyles";

export default function PricingCard({
  action,
  buttonText,
  buttonVariant,
  description1,
  description2,
  description3,
  price,
  priceMonth,
  subTitle,
  title,
}: Props): JSX.Element {
  const classes = PricingCardStyles();

  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subTitle}
        titleTypographyProps={{align: "center"}}
        subheaderTypographyProps={{align: "center"}}
        action={action}
        className={classes.cardHeader}
      />
      <CardContent>
        <div className={classes.cardPricing}>
          <Typography component="h2" variant="h3" color="textPrimary">
            {price}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {priceMonth}
          </Typography>
        </div>
        {[description1, description2, description3].map((line: string) => (
          <Typography
            noWrap
            component="p"
            variant="subtitle1"
            align="center"
            key={line}
          >
            {line}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Button fullWidth variant={buttonVariant} color="primary">
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}
