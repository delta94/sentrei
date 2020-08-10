import Container from "@material-ui/core/Container";
import * as React from "react";

import PaperCups from "@sentrei/ui/components/PaperCups";

export default function HelpScreen(): JSX.Element {
  return (
    <>
      <Container maxWidth="xs">
        <PaperCups defaultIsOpen />
      </Container>
    </>
  );
}
