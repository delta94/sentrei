import * as React from "react";
import {useInView} from "react-intersection-observer";
import {useSpring, animated} from "react-spring";
import Typist from "react-typist";
import styled from "styled-components";

import Props from "@sentrei/types/components/Typical";

import TypicalStyles from "./TypicalStyles";

const StyledTypist = styled(Typist)`
  .Cursor {
    animation-name: blinker;
    animation-duration: 1.2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  @keyframes blinker {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default function CustomTypical({
  typicalOne,
  typicalTwo,
  typicalThree,
}: Props): JSX.Element {
  const classes = TypicalStyles();

  const [count, setCount] = React.useState(1);

  React.useEffect(() => {
    setCount(1);
  }, [count]);

  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const props = useSpring({opacity: inView ? 1 : 0});

  return (
    <animated.span ref={ref} style={props} className={classes.spring}>
      {count && (
        <StyledTypist
          avgTypingDelay={70}
          stdTypingDelay={30}
          startDelay={300}
          onTypingDone={(): void => setCount(0)}
          className={classes.typical}
        >
          <span>{typicalOne}</span>
          <Typist.Backspace count={typicalOne.length} delay={3000} />
          <span>{typicalTwo}</span>
          <Typist.Backspace count={typicalTwo.length} delay={3000} />
          <span>{typicalThree}</span>
          <Typist.Backspace count={typicalThree.length} delay={9000} />
        </StyledTypist>
      )}
    </animated.span>
  );
}
