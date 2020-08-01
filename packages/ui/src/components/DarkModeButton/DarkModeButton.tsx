import IconButton from "@material-ui/core/IconButton";
import useTheme from "@material-ui/core/styles/useTheme";
import Brightness4 from "@material-ui/icons/Brightness4";
import Brightness5 from "@material-ui/icons/Brightness5";
import * as React from "react";

import useDarkMode from "use-dark-mode";

function DarkModeButton(): JSX.Element {
  const paletteType = useTheme().palette.type;
  const {value: isDark, toggle: toggleDarkMode} = useDarkMode(false);

  return (
    <IconButton onClick={toggleDarkMode}>
      {paletteType === "dark" ? <Brightness5 /> : <Brightness4 />}
    </IconButton>
  );
}

export default DarkModeButton;
