import * as React from "react";

import Header, {Props as Original} from "@sentrei/ui/components/Header";
import LogoPicture from "@sentrei/web/images/png/LogoPicture";

type Props = Omit<Original, "logo">;

export default function SentreiHeader({
  sign = true,
  spy = true,
}: Props): JSX.Element {
  return <Header sign={sign} spy={spy} logo={<LogoPicture />} />;
}
