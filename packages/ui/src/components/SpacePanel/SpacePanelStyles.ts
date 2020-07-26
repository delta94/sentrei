import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const SpaceScreenStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      width: "3px",
      background: theme.palette.grey[500],
      height: theme.spacing(70),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    media: {
      height: theme.spacing(10),
      maxWidth: theme.spacing(10),
    },
    paper: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0,
    },
    rooms: {
      maxWidth: theme.spacing(30),
    },
    placeholder: {
      backgroundColor: theme.palette.grey[300],
    },
  }),
);

export default SpaceScreenStyles;
