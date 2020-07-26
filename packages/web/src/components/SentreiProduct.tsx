import * as React from "react";
import {useInView} from "react-intersection-observer";

import {analytics} from "@sentrei/common/utils/firebase";
import Product from "@sentrei/ui/components/Product";
import ConnectPicture from "@sentrei/web/images/svg/ConnectPicture";
import DataPicture from "@sentrei/web/images/svg/DataPicture";
import VideoPicture from "@sentrei/web/images/svg/VideoPicture";

export default function SentreiProduct(): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  React.useEffect(() => {
    if (inView) {
      analytics().logEvent("landing", {section: "product"});
    }
  }, [inView]);
  return (
    <div ref={ref}>
      <Product
        connectImg={<ConnectPicture />}
        dataImg={<DataPicture />}
        videoImg={<VideoPicture />}
      />
    </div>
  );
}
