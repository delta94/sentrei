import {NextPage} from "next";
import Router from "next-translate/Router";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import Loader from "@sentrei/ui/components/Loader";
import NoHubSpot from "@sentrei/ui/components/NoHubSpot";
import SpaceActivity from "@sentrei/ui/components/SpaceActivity";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const ActivityPage: NextPage = () => {
  const {query} = useRouter();
  const {user} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("spaceActivity");
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
      {user ? (
        <SentreiAppHeader userId={user.uid} spaceId={String(query.spaceId)} />
      ) : (
        <SentreiAppHeader spaceId={String(query.spaceId)} />
      )}
      <SpaceActivity spaceId={String(query.spaceId)} />
    </>
  );
};

export default ActivityPage;
