/* eslint-disable @typescript-eslint/require-await */

// import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import Router from "next-translate/Router";

import Error from "next/error";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getProfileUsername} from "@sentrei/common/firebase/profiles";
import {analytics} from "@sentrei/common/utils/firebase";
import Props from "@sentrei/types/pages/profile/[usernameId]";
import ProfileScreen from "@sentrei/ui/components/ProfileScreen";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

export const getStaticPaths: GetStaticPaths = async () => {
  return {paths: [], fallback: true};
};

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const usernameId = String(params?.usernameId);
  const profile = await getProfileUsername(usernameId);
  return {props: {profile}, revalidate: 1};
};

// export const getServerSideProps: GetServerSideProps<Props> = async ({
//   params,
// }) => {
//   const usernameId = String(params?.usernameId);
//   const profile = await getProfileUsername(usernameId);
//   return {props: {profile}};
// };

const UsernameId = ({
  profile,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  // }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const {user} = React.useContext(AuthContext);
  const {isFallback} = useRouter();

  React.useEffect(() => {
    analytics().setCurrentScreen("profile");
  }, []);

  if (user === undefined || (!profile && isFallback)) {
    return (
      <>
        {user ? <SentreiAppHeader userId={user.uid} /> : <SentreiAppHeader />}
        <SkeletonForm />
      </>
    );
  }

  if (!user) {
    Router.pushI18n("/");
  }

  if (!profile) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      {user ? <SentreiAppHeader userId={user.uid} /> : <SentreiAppHeader />}
      {user && profile && <ProfileScreen profile={profile} />}
    </>
  );
};

export default UsernameId;
