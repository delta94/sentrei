import * as React from "react";

import {useInView} from "react-intersection-observer";

import {analytics} from "@sentrei/common/utils/firebase";
import Screen from "@sentrei/ui/components/Screen";
import ConnectPicture from "@sentrei/web/images/svg/ConnectPicture";
import DataPicture from "@sentrei/web/images/svg/DataPicture";
import VideoPicture from "@sentrei/web/images/svg/VideoPicture";

export default function SentreiScreen(): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  React.useEffect(() => {
    if (inView) {
      analytics().logEvent("landing", {section: "screen"});
    }
  }, [inView]);
  return (
    <div ref={ref}>
      <Screen
        imgOne={<VideoPicture />}
        imgTwo={<ConnectPicture />}
        imgThree={<DataPicture />}
      />
    </div>
  );
}
