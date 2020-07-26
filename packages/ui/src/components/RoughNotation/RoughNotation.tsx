import * as React from "react";
import {useInView} from "react-intersection-observer";
import {RoughNotation} from "react-rough-notation";

import Theme from "@sentrei/common/containers/Theme";
import Props from "@sentrei/types/components/RoughNotation";

export default function CustomRoughNotation({
  animate = true,
  animationDelay = 0,
  animationDuration = 800,
  color,
  initial = false,
  text,
  type,
}: Props): JSX.Element {
  const [show, setShow] = React.useState(initial);
  const [ref, inView] = useInView({
    threshold: 0,
  });
  React.useEffect(() => {
    setShow(inView);
  }, [inView]);

  return (
    <span ref={ref}>
      <RoughNotation
        animate={animate}
        animationDelay={animationDelay}
        animationDuration={animationDuration}
        color={
          color === "primary"
            ? Theme.palette.primary.main
            : color === "primary-light"
            ? Theme.palette.primary.light
            : color === "secondary"
            ? Theme.palette.secondary.main
            : color === "secondary-light"
            ? Theme.palette.secondary.light
            : color
        }
        show={show}
        type={type}
      >
        {text}
      </RoughNotation>
    </span>
  );
}
