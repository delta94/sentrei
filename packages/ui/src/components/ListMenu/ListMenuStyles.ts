import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LoadMoreStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

export default LoadMoreStyles;
