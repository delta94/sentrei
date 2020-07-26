import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const SpaceCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
    },
    media: {
      height: theme.spacing(30),
    },
    placeholder: {
      backgroundColor: theme.palette.grey[300],
    },
    root: {
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
      },
    },
  }),
);

export default SpaceCardStyles;
