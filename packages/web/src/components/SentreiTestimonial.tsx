import * as React from "react";

import {useInView} from "react-intersection-observer";

import {analytics} from "@sentrei/common/utils/firebase";
import Testimonial from "@sentrei/ui/components/Testimonial";
import FocusPicture from "@sentrei/web/images/svg/FocusPicture";

export default function SentreiTestimonial(): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      analytics().logEvent("landing", {section: "testimonial"});
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <Testimonial
        imgOne={<FocusPicture />}
        imgTwo={<FocusPicture />}
        imgThree={<FocusPicture />}
      />
    </div>
  );
}
