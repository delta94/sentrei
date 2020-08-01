import {NextPage} from "next";
import Router from "next-translate/Router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import {analytics} from "@sentrei/common/utils/firebase";
import Loader from "@sentrei/ui/components/Loader";

import ProfileForm from "@sentrei/ui/components/ProfileForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const Profile: NextPage = () => {
  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("profile");
  }, []);

  if (user === undefined) {
    return <Loader />;
  }

  if (!user) {
    Router.pushI18n("/");
  }

  return (
    <>
      {user ? (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          userId={user.uid}
        />
      ) : (
        <SentreiAppHeader />
      )}
      {user && profile && <ProfileForm user={user} profile={profile} />}
    </>
  );
};

export default Profile;
