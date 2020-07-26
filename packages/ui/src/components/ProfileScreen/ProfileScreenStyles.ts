import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AuthStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    button: {
      marginTop: theme.spacing(5),
      width: "100%",
    },
    large: {
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    paper: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);

export default AuthStyles;
