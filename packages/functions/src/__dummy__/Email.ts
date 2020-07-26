import {notificationEmail} from "@sentrei/functions/__dummy__/Notification";
import Email from "@sentrei/types/models/Email";

// eslint-disable-next-line import/prefer-default-export
export const emailNotification: Email = {
  to: "test@test.com",
  from: "support@sentrei.com",
  templateId: "en",
  dynamic_template_data: notificationEmail,
};
