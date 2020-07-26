import {storiesOf} from "@storybook/react";
import * as React from "react";

import Copyright from ".";

storiesOf("Copyright", module)
  .addParameters({
    screenshot: {
      delay: 200,
    },
  })
  .add("Just an Copyright story", () => <Copyright />);
