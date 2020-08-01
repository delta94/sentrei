import Container from "@material-ui/core/Container";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import LockIcon from "@material-ui/icons/Lock";
import PhotoIcon from "@material-ui/icons/Photo";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import Error from "next/error";
import * as React from "react";

import {getRoom} from "@sentrei/common/firebase/rooms";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import RoomNameForm from "@sentrei/ui/components/RoomNameForm";
import SettingsUsernameForm from "@sentrei/ui/components/SettingsUsernameForm";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import TabBoard from "@sentrei/ui/components/TabBoard";

export interface Props {
  profile: Profile.Get;
  roomId: string;
  spaceId: string;
  user: User.Get;
}

export default function RoomEdit({profile, roomId, user}: Props): JSX.Element {
  const {t} = useTranslation();
  const [room, setRoom] = React.useState<Room.Get | null | undefined>();

  React.useEffect(() => {
    getRoom(roomId).then(setRoom);
  }, [roomId]);

  if (room === undefined) {
    return <SkeletonForm />;
  }

  if (room === null) {
    return <Error statusCode={404} />;
  }

  return (
    <FormSection
      icon={<SettingsIcon />}
      title={t("room:room.editRoom")}
      size="md"
    >
      <>
        <TabBoard
          tabIconOne={<AssignmentIndIcon />}
          tabIconTwo={<PhotoIcon />}
          tabIconThree={<LockIcon />}
          tabLabelOne={t("common:common.name")}
          tabLabelTwo={t("common:common.photo")}
          tabLabelThree={t("common:common.username")}
          tabPanelOne={
            <Container component="main" maxWidth="xs">
              <RoomNameForm profile={profile} room={room} user={user} />
            </Container>
          }
          tabPanelTwo={<></>}
          tabPanelThree={
            <Container component="main" maxWidth="xs">
              <SettingsUsernameForm profile={profile} user={user} />
            </Container>
          }
        />
      </>
    </FormSection>
  );
}
