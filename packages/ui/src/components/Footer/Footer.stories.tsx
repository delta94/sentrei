import {storiesOf} from "@storybook/react";
import * as React from "react";

import Footer from ".";

storiesOf("Footer", module)
  .addParameters({
    screenshot: {
      delay: 200,
    },
  })
  .add("Just an Footer story", () => <Footer />);
