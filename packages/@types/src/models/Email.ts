import Notification from "@sentrei/types/models/Notification";

export default interface Email {
  to: string;
  from: string;
  templateId: string;
  dynamic_template_data: Notification.Email;
}
