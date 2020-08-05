import {NextPage} from "next";
import Router from "next-translate/Router";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import Loader from "@sentrei/ui/components/Loader";
import NoHubSpot from "@sentrei/ui/components/NoHubSpot";
import SpaceLeaderboard from "@sentrei/ui/components/SpaceLeaderboard";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const LeaderboardPage: NextPage = () => {
  const {query} = useRouter();
  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("spaceLeaderboard");
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
      {user && profile ? (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
          spaceId={String(query.spaceId)}
        />
      ) : (
        <SentreiAppHeader spaceId={String(query.spaceId)} />
      )}
      <SpaceLeaderboard spaceId={String(query.spaceId)} />
    </>
  );
};

export default LeaderboardPage;
