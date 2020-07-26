import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Props from "@sentrei/types/components/Product";
import ProductCard from "@sentrei/ui/components/ProductCard";

import ProductStyles from "./ProductStyles";

export default function Product({
  connectImg,
  dataImg,
  videoImg,
}: Props): JSX.Element {
  const classes = ProductStyles();
  const {t} = useTranslation();

  return (
    <Container maxWidth="lg" component="main" className={classes.product}>
      <ProductCard
        left
        color="secondary-light"
        img={videoImg}
        subTitle={t("index:product.videoSubTitle")}
        titleOne={t("index:product.videoTitleOne")}
        titleTwo={t("index:product.videoTitleTwo")}
        titleThree={t("index:product.videoTitleThree")}
        type="highlight"
      />
      <Box py={3} />
      <ProductCard
        left={false}
        color="secondary-light"
        img={connectImg}
        subTitle={t("index:product.connectSubTitle")}
        titleOne={t("index:product.connectTitleOne")}
        titleTwo={t("index:product.connectTitleTwo")}
        titleThree={t("index:product.connectTitleThree")}
        type="highlight"
      />
      <Box py={3} />
      <ProductCard
        left
        color="secondary-light"
        img={dataImg}
        subTitle={t("index:product.dataSubTitle")}
        titleOne={t("index:product.dataTitleOne")}
        titleTwo={t("index:product.dataTitleTwo")}
        titleThree={t("index:product.dataTitleThree")}
        type="highlight"
      />
    </Container>
  );
}
