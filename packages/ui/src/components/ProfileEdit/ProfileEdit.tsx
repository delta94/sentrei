import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DescriptionIcon from "@material-ui/icons/Description";
import PhotoIcon from "@material-ui/icons/Photo";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import FormSection from "@sentrei/ui/components/FormSection";
import ProfileEmojiForm from "@sentrei/ui/components/ProfileEmojiForm";
import ProfileNameForm from "@sentrei/ui/components/ProfileNameForm";
import TabBoard from "@sentrei/ui/components/TabBoard";

interface Props {
  profile: Profile.Get;
}

export default function ProfileEdit({profile}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <FormSection
        icon={<SettingsIcon />}
        title={t("profile:profile.editProfile")}
        size="md"
      />
      <TabBoard
        size="sm"
        tabIconOne={<AssignmentIndIcon />}
        tabIconTwo={<PhotoIcon />}
        tabIconThree={<DescriptionIcon />}
        tabLabelOne={t("common:common.name")}
        tabLabelTwo={t("common:common.photo")}
        tabLabelThree={t("common:common.status")}
        tabPanelOne={<ProfileNameForm profile={profile} />}
        tabPanelTwo={<ProfileEmojiForm profile={profile} />}
        tabPanelThree={<></>}
      />
    </>
  );
}
