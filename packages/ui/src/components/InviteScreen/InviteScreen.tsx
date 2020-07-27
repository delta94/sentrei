import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import EmailIcon from "@material-ui/icons/Email";
import LinkIcon from "@material-ui/icons/Link";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import Error from "next/error";
import * as React from "react";

import {getInvitesLive} from "@sentrei/common/firebase/invites";
import {getSpace} from "@sentrei/common/firebase/spaces";
import Props from "@sentrei/types/components/InviteScreen";
import Invite from "@sentrei/types/models/Invite";
import Space from "@sentrei/types/models/Space";
import FormSection from "@sentrei/ui/components/FormSection";
import InviteEmailForm from "@sentrei/ui/components/InviteEmailForm";
import InviteLinkForm from "@sentrei/ui/components/InviteLinkForm";
import InviteList from "@sentrei/ui/components/InviteList";
import InviteUsernameForm from "@sentrei/ui/components/InviteUsernameForm";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import TabBoard from "@sentrei/ui/components/TabBoard";

export default function InviteScreen({
  profile,
  user,
  spaceId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [space, setSpace] = React.useState<Space.Get | null | undefined>();
  const [invites, setInvites] = React.useState<
    Invite.Get[] | null | undefined
  >();

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

  React.useEffect(() => {
    const unsubscribe = getInvitesLive("spaces", spaceId, snap => {
      setInvites(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [spaceId]);

  if (space === undefined) {
    return <SkeletonForm />;
  }

  if (!space) {
    return <Error statusCode={404} />;
  }

  return (
    <FormSection icon={<SettingsIcon />} title={t("common:const.invite")}>
      <>
        <TabBoard
          tabIconOne={<EmailIcon />}
          tabIconTwo={<LinkIcon />}
          tabIconThree={<AssignmentIndIcon />}
          tabLabelOne={t("common:const.email")}
          tabLabelTwo={t("common:const.link")}
          tabLabelThree={t("common:const.username")}
          tabPanelOne={
            <>
              <Container component="main" maxWidth="xs">
                <InviteEmailForm
                  profile={profile}
                  user={user}
                  spaceId={spaceId}
                />
              </Container>
              <Box p={1} />
              <Container component="main" maxWidth="md">
                <></>
                {invites && <InviteList invites={invites} type="email" />}
              </Container>
            </>
          }
          tabPanelTwo={
            <>
              <Container component="main" maxWidth="xs">
                <InviteLinkForm
                  profile={profile}
                  user={user}
                  spaceId={spaceId}
                />
              </Container>
              <Box p={1} />
              <Container component="main" maxWidth="md">
                <></>
                {invites && <InviteList invites={invites} type="link" />}
              </Container>
            </>
          }
          tabPanelThree={
            <Container component="main" maxWidth="xs">
              <InviteUsernameForm
                profile={profile}
                user={user}
                spaceId={spaceId}
              />
            </Container>
          }
        />
      </>
    </FormSection>
  );
}
