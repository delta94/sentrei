import User from "@sentrei/types/models/User";

declare namespace Email {
  export interface Invite {
    language: User.Language;
    link: string;
    name: string;
    title: string;
    sender: string;
  }

  export interface Update {
    language: User.Language;
    editId: string;
    name: string;
  }

  export interface SendGrid {
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
  }
}

export default Email;
