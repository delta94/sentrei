import * as React from "react";

import Original from "@sentrei/types/components/Header";
import Header from "@sentrei/ui/components/Header";
import LogoPicture from "@sentrei/web/images/png/LogoPicture";

type Props = Omit<Original, "logo">;

export default function SentreiHeader({
  sign = true,
  spy = true,
}: Props): JSX.Element {
  return <Header sign={sign} spy={spy} logo={<LogoPicture />} />;
}
