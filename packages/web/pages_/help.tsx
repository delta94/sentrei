import {NextPage} from "next";
import * as React from "react";

import HubSpot from "@sentrei/ui/components/HubSpot";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const Help: NextPage = () => {
  return (
    <>
      <SentreiAppHeader />
      <HubSpot />
    </>
  );
};

export default Help;
