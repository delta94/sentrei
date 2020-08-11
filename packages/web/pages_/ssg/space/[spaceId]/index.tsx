import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import Router from "next-translate/Router";

import Error from "next/error";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getSpace} from "@sentrei/common/firebaseAdmin/spaces";
import {analytics} from "@sentrei/common/utils/firebase";
import Space from "@sentrei/types/models/Space";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

export interface Props {
  spaceData: string | null;
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {paths: [], fallback: "unstable_blocking"};
};

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const spaceId = String(params?.spaceId);
  const spaceData = JSON.stringify(await getSpace(spaceId));
  return {props: {spaceData}, revalidate: 300};
};

const SpaceId = ({
  spaceData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const {user} = React.useContext(AuthContext);
  const [space] = React.useState<Space.Get | null | undefined>(
    spaceData ? (JSON.parse(spaceData) as Space.Get) : null,
  );

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
      {user && space && <h1>{space.id}</h1>}
    </>
  );
};

export default SpaceId;
