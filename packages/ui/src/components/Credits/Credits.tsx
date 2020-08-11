import ButtonBase from "@material-ui/core/ButtonBase";
import {useTheme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {motion, AnimatePresence} from "framer-motion";
import * as React from "react";
import UseAnimations from "react-useanimations";
import heart from "react-useanimations/lib/heart";

import MuiLink from "@sentrei/ui/components/MuiLink";

export default function Credits(): JSX.Element {
  const theme = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const handleClick = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Typography variant="body2" color="textSecondary" align="center">
        Brought you with
        <UseAnimations
          animation={heart}
          reverse={isOpen}
          strokeColor={theme.palette.secondary.main}
          onClick={handleClick}
          pathCss={`fill: ${theme.palette.secondary.main};`}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          render={(eventProps: any, animationProps: any): JSX.Element => (
            <ButtonBase {...eventProps}>
              <div {...animationProps} />
            </ButtonBase>
          )}
        />
        from the <MuiLink href="/team">Sentrei Team</MuiLink>
      </Typography>
      <AnimatePresence initial={isOpen}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {opacity: 1, height: "auto"},
              collapsed: {opacity: 0, height: 0},
            }}
            transition={{duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]}}
          >
            <MuiLink color="secondary" href="/credits">
              <Typography variant="body2" color="secondary" align="center">
                Special thanks to our families, friends, and everyone who have
                made it possible
              </Typography>
            </MuiLink>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
