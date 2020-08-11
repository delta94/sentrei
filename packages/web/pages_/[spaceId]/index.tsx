import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import Router from "next-translate/Router";

import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getSpace} from "@sentrei/common/firebaseAdmin/spaces";
import {analytics} from "@sentrei/common/utils/firebase";
import Space from "@sentrei/types/models/Space";
import Loader from "@sentrei/ui/components/Loader";
import StatusSpace from "@sentrei/ui/components/StatusSpace";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SpaceScreen = dynamic(
  () => {
    return import("@sentrei/ui/components/SpaceScreen");
  },
  {ssr: false},
);

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
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("space");
  }, []);

  if (user === undefined) {
    return <Loader />;
  }

  if (!user || !spaceData) {
    Router.pushI18n("/");
  }

  return (
    <>
      {user && profile ? (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
        />
      ) : (
        <SentreiAppHeader />
      )}
      {user && profile && <StatusSpace userId={user.uid} profile={profile} />}
      {user && profile && spaceData && (
        <SpaceScreen
          profile={profile}
          spaceData={JSON.parse(spaceData) as Space.Get}
          spaceId={String(query.spaceId)}
          user={user}
        />
      )}
    </>
  );
};

export default SpaceId;
