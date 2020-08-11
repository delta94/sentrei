import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import Router from "next-translate/Router";

import Error from "next/error";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getSpace} from "@sentrei/common/firebaseAdmin/spaces";
import {analytics} from "@sentrei/common/utils/firebase";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

export interface Props {
  space: string | null;
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {paths: [], fallback: "unstable_blocking"};
};

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const spaceId = String(params?.spaceId);
  const space = JSON.stringify(await getSpace(spaceId));
  return {props: {space}, revalidate: 1};
};

const SpaceId = ({
  space,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const {user} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("profile");
  }, []);

  if (user === undefined) {
    return (
      <>
        <SentreiAppHeader />
        <SkeletonForm />
      </>
    );
  }

  if (!user) {
    Router.pushI18n("/");
  }

  if (!space) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      {user ? <SentreiAppHeader userId={user.uid} /> : <SentreiAppHeader />}
      {user && space && <h1>{space}</h1>}
    </>
  );
};

export default SpaceId;
