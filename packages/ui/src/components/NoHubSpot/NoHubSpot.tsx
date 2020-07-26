import * as React from "react";

export default function NoHubSpot(): JSX.Element {
  const hubspot = document.getElementById("hubspot-messages-iframe-container");

  React.useEffect(() => {
    if (hubspot) {
      hubspot.remove();
    }
  }, [hubspot]);

  return <></>;
}
