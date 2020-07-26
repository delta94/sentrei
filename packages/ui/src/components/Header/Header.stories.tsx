import {storiesOf} from "@storybook/react";
import I18nProvider from "next-translate/I18nProvider";
import * as React from "react";

import index from "../../locales/en/index.json";

import Header from ".";

storiesOf("Header", module)
  .addParameters({
    screenshot: {
      delay: 200,
    },
  })
  .add("Header", () => (
    <I18nProvider lang="en" namespaces={{index}}>
      <Header logo={<></>} />
    </I18nProvider>
  ));
