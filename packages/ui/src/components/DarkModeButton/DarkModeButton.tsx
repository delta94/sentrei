import IconButton from "@material-ui/core/IconButton";
import useTheme from "@material-ui/core/styles/useTheme";
import Brightness4 from "@material-ui/icons/Brightness4";
import Brightness5 from "@material-ui/icons/Brightness5";
import * as React from "react";

import useToggleDarkMode from "@sentrei/ui/hooks/useDarkMode";

function DarkModeButton(): JSX.Element {
  const paletteType = useTheme().palette.type;
  const toggleDarkMode = useToggleDarkMode();

  return (
    <IconButton onClick={toggleDarkMode}>
      {paletteType === "dark" ? <Brightness5 /> : <Brightness4 />}
    </IconButton>
  );
}

export default DarkModeButton;
