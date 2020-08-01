import Container from "@material-ui/core/Container";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DescriptionIcon from "@material-ui/icons/Description";
import PhotoIcon from "@material-ui/icons/Photo";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import FormSection from "@sentrei/ui/components/FormSection";
import ProfileNameForm from "@sentrei/ui/components/ProfileNameForm";
import TabBoard from "@sentrei/ui/components/TabBoard";

interface Props {
  profile: Profile.Get;
}

export default function ProfileEdit({profile}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <FormSection
      icon={<SettingsIcon />}
      title={t("profile:profile.editProfile")}
      size="md"
    >
      <>
        <TabBoard
          tabIconOne={<DescriptionIcon />}
          tabIconTwo={<AssignmentIndIcon />}
          tabIconThree={<PhotoIcon />}
          tabLabelOne={t("common:common.description")}
          tabLabelTwo={t("common:common.name")}
          tabLabelThree={t("common:common.photo")}
          tabPanelOne={<></>}
          tabPanelTwo={
            <Container component="main" maxWidth="xs">
              <ProfileNameForm profile={profile} />
            </Container>
          }
          tabPanelThree={<></>}
        />
      </>
    </FormSection>
  );
}
