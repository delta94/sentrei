import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import Loader from "@sentrei/ui/components/Loader";
import NoHubSpot from "@sentrei/ui/components/NoHubSpot";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const InviteScreen = dynamic(
  () => {
    return import("@sentrei/ui/components/InviteScreen");
  },
  {ssr: false},
);

const Invite: NextPage = () => {
  const {query} = useRouter();
  const {profile, user} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("spaceEdit");
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
      {user && (
        <SentreiAppHeader userId={user.uid} spaceId={String(query.spaceId)} />
      )}
      {user && profile && (
        <InviteScreen
          profile={profile}
          user={user}
          spaceId={String(query.spaceId)}
        />
      )}
    </>
  );
};

export default Invite;
