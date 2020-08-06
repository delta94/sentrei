import {createStyles, makeStyles} from "@material-ui/core/styles";

const SpaceScreenStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

export default SpaceScreenStyles;
