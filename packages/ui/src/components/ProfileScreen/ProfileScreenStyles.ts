import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AuthStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  }),
);

export default AuthStyles;
