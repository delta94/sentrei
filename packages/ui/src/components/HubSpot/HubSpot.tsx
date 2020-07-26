import Head from "next/head";
import * as React from "react";

export default function HubSpot(): JSX.Element {
  return (
    <Head>
      <script
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src="//js.hs-scripts.com/8029005.js"
      />
    </Head>
  );
}
