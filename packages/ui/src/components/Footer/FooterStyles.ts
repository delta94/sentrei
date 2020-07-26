import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const FeatureStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    main: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
    },
    footer: {
      padding: theme.spacing(3, 2),
      marginTop: "auto",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
    },
    social: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
);

export default FeatureStyles;
