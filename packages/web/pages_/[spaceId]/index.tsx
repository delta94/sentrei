import Router from "next-translate/Router";

import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import Loader from "@sentrei/ui/components/Loader";
import NoHubSpot from "@sentrei/ui/components/NoHubSpot";
import StatusSpace from "@sentrei/ui/components/StatusSpace";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SpaceScreen = dynamic(
  () => {
    return import("@sentrei/ui/components/SpaceScreen");
  },
  {ssr: false},
);

const SpaceId = (): JSX.Element => {
  const {query} = useRouter();
  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("space");
  }, []);

  if (user === undefined) {
    return <Loader />;
  }

  if (!user) {
    Router.pushI18n("/");
  }

  return (
    <>
      <NoHubSpot />
      {user ? <SentreiAppHeader userId={user.uid} /> : <SentreiAppHeader />}
      {user && profile && <StatusSpace userId={user.uid} profile={profile} />}
      {user && profile && <SpaceScreen spaceId={String(query.spaceId)} />}
    </>
  );
};

export default SpaceId;
