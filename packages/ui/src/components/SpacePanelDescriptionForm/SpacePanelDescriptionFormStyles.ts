import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const SpacePanelDescriptionFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexGrow: 10,
      justifyContent: "space-between",
      marginLeft: theme.spacing(1),
    },
    iconButton: {
      alignSelf: "flex-end",
      padding: 10,
    },
  }),
);

export default SpacePanelDescriptionFormStyles;
