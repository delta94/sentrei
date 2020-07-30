import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import LockIcon from "@material-ui/icons/Lock";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import NotificationForm from "@sentrei/ui/components/SettingsNotificationForm";
import PasswordUpdateForm from "@sentrei/ui/components/SettingsPasswordForm";
import SettingsUsernameForm from "@sentrei/ui/components/SettingsUsernameForm";
import TabBoard from "@sentrei/ui/components/TabBoard";

export interface Props {
  profile: Profile.Get;
  user: User.Get;
}

const SettingsScreen = ({profile, user}: Props): JSX.Element => {
  const {t} = useTranslation();

  return (
    <FormSection
      icon={<SettingsIcon />}
      title={t("settings:settings.title")}
      size="md"
    >
      <>
        <TabBoard
          tabIconOne={<AssignmentIndIcon />}
          tabIconTwo={<NotificationsIcon />}
          tabIconThree={<LockIcon />}
          tabLabelOne={t("common:common.notifications")}
          tabLabelTwo={t("common:common.password")}
          tabLabelThree={t("common:common.username")}
          tabPanelOne={
            <Container component="main" maxWidth="xs">
              <Grid container justify="center" direction="row" spacing={3}>
                <Grid item xs={12}>
                  <NotificationForm
                    profile={profile}
                    user={user}
                    content="chat"
                    label="Chat"
                  />
                </Grid>
                <Grid item xs={12}>
                  <NotificationForm
                    profile={profile}
                    user={user}
                    content="invitation"
                    label="Invitation"
                  />
                </Grid>
                <Grid item xs={12}>
                  <NotificationForm
                    profile={profile}
                    user={user}
                    content="update"
                    label="Update"
                  />
                </Grid>
              </Grid>
            </Container>
          }
          tabPanelTwo={
            <Container component="main" maxWidth="xs">
              <PasswordUpdateForm />
            </Container>
          }
          tabPanelThree={
            <Container component="main" maxWidth="xs">
              <SettingsUsernameForm profile={profile} user={user} />
            </Container>
          }
        />
      </>
    </FormSection>
  );
};

export default SettingsScreen;
