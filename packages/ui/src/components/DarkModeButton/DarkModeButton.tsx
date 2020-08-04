import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {DarkModeSwitch} from "react-toggle-dark-mode";

import useDarkMode from "use-dark-mode";

function DarkModeButton(): JSX.Element {
  const {t} = useTranslation();
  const {value: isDark, toggle: toggleDarkMode} = useDarkMode(false);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Box px={3}>
            <DarkModeSwitch checked={isDark} onChange={toggleDarkMode} />
          </Box>
        }
        label={
          isDark ? t("common:common.darkMode") : t("common:common.lightMode")
        }
      />
    </FormGroup>
  );
}

export default DarkModeButton;
