import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";

import Switch from "@material-ui/core/Switch";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {updateNotificationSettings} from "@sentrei/common/firebase/users";
import Props from "@sentrei/types/components/NotificationForm";
import User from "@sentrei/types/models/User";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

const NotificationForm = ({user, content, label}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();
  const [active, setActive] = React.useState<User.NotificationType[]>([]);

  const handleContent = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!user) return;
    const {checked} = event.target;
    const name = event.target.name as User.NotificationType;
    const action = checked ? "add" : "remove";
    const newArr: User.NotificationType[] =
      action === "add"
        ? [...active, name]
        : active.filter(item => item !== name);
    setActive(newArr);

    try {
      updateNotificationSettings(user.uid, content, newArr);
    } catch (err) {
      snackbar("error", err);
    }
  };

  React.useEffect(() => {
    if (user) setActive(user.notificationSettings[content]);
  }, [content, user]);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={active.includes("app")}
              onChange={handleContent}
              name="app"
              color="primary"
            />
          }
          label={t("common:const.app")}
        />
        <FormControlLabel
          control={
            <Switch
              checked={active.includes("email")}
              onChange={handleContent}
              name="email"
              color="primary"
            />
          }
          label={t("common:const.email")}
        />
      </FormGroup>
    </FormControl>
  );
};

export default NotificationForm;
