import * as React from "react";

import DispatchContext from "@sentrei/common/context/DispatchContext";
import {ThemeAction} from "@sentrei/types/states/ThemeState";

export default function useDarkMode(): () => void {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback(
    () => dispatch(<ThemeAction>{type: "TOGGLE_DARKMODE"}),
    [dispatch],
  );
}
