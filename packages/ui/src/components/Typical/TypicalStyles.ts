import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const TypicalStyles = makeStyles((theme: Theme) =>
  createStyles({
    spring: {
      display: "inline-block",
      placeContent: "start",
    },
    typical: {
      color: theme.palette.primary.main,
    },
  }),
);

export default TypicalStyles;
