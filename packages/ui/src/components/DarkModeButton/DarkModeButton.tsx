import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import useTranslation from "next-translate/useTranslation";

import * as React from "react";

import useDarkMode from "use-dark-mode";

function DarkModeButton(): JSX.Element {
  const {t} = useTranslation();
  const {value: isDark, toggle: toggleDarkMode} = useDarkMode(false);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch color="primary" checked={isDark} onChange={toggleDarkMode} />
        }
        label={
          isDark ? t("common:common.darkMode") : t("common:common.lightMode")
        }
      />
    </FormGroup>
  );
}

export default DarkModeButton;
