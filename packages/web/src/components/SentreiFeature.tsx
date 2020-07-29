import * as React from "react";
import {useInView} from "react-intersection-observer";

import {analytics} from "@sentrei/common/utils/firebase";
import Feature from "@sentrei/ui/components/Feature";
import FocusPicture from "@sentrei/web/images/svg/FocusPicture";
import GoalPicture from "@sentrei/web/images/svg/GoalPicture";
import TimePicture from "@sentrei/web/images/svg/TimePicture";

export default function SentreiFeature(): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      analytics().logEvent("landing", {section: "feature"});
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <Feature
        imgOne={<TimePicture />}
        imgTwo={<FocusPicture />}
        imgThree={<GoalPicture />}
      />
    </div>
  );
}
