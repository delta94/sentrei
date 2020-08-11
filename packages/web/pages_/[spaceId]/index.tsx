import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import Router from "next-translate/Router";

import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getAdminMembers} from "@sentrei/common/firebaseAdmin/members";
import {getAdminRooms} from "@sentrei/common/firebaseAdmin/rooms";
import {getAdminSpace} from "@sentrei/common/firebaseAdmin/spaces";
import {analytics} from "@sentrei/common/utils/firebase";
import Member from "@sentrei/types/models/Member";
import Room from "@sentrei/types/models/Room";
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
  membersData: string | null;
  roomsData: string | null;
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {paths: [], fallback: "unstable_blocking"};
};

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const spaceId = String(params?.spaceId);
  const spaceReq = getAdminSpace(spaceId);
  const membersReq = getAdminMembers({
    collection: "spaces",
    docId: spaceId,
  });
  const roomsReq = getAdminRooms({
    spaceId,
  });
  const [spaceData, membersData, roomsData] = await Promise.all([
    spaceReq,
    membersReq,
    roomsReq,
  ]);
  return {
    props: {
      spaceData: JSON.stringify(spaceData),
      membersData: JSON.stringify(membersData),
      roomsData: JSON.stringify(roomsData),
    },
    revalidate: 300,
  };
};

const SpaceId = ({
  spaceData,
  membersData,
  roomsData,
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
      {/* <h1>{spaceData}</h1>
      <h2>{membersData}</h2>
      <h3>{roomsData}</h3> */}
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
      {user && profile && spaceData && membersData && roomsData && (
        <SpaceScreen
          user={user}
          profile={profile}
          memberData={
            (JSON.parse(membersData) as Member.Get[]).filter(
              doc => doc.uid === profile.uid,
            )[0] as Member.Get
          }
          membersData={JSON.parse(membersData) as Member.Get[]}
          roomsData={JSON.parse(roomsData) as Room.Get[]}
          spaceData={JSON.parse(spaceData) as Space.Get}
          spaceId={String(query.spaceId)}
        />
      )}
    </>
  );
};

export default SpaceId;
