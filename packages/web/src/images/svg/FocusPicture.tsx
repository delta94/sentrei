import * as React from "react";

import PictureSvg from "@sentrei/ui/components/PictureSvg";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const src = require("../../../public/images/focus.svg");

export default function FocusPicture(): JSX.Element {
  return <PictureSvg alt="focus" src={src} />;
}
