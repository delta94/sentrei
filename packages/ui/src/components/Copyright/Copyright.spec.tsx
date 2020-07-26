import {shallow} from "enzyme";
import * as React from "react";

import Copyright from ".";

describe("Copyright", () => {
  test("render", () => {
    shallow(<Copyright />);
  });
});
