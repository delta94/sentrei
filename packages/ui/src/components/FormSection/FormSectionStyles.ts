import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AuthFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    paper: {
      marginTop: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }),
);

export default AuthFormStyles;
