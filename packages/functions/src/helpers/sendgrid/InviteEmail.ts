import Email from "@sentrei/types/models/Email";
import User from "@sentrei/types/models/User";

class InviteEmail {
  public constructor({link, name, title, sender}: Email.Invite) {
    this.link = link;
    this.name = name;
    this.title = title;
    this.sender = sender;
  }

  link: string;

  name: string;

  title: string;

  sender: string;

  public html(language: User.Language): string {
    if (language === "ja") {
      return "";
    }
    return `
    <h1>Hi ${this.name}, you've been invited to join "${this.title}".</h1>
    <p>${this.sender} has invited you to join the space: <strong>${this.title}</strong>.</p>
    <p>Click on the link to join now: <a href="${this.link}">${this.link}</a></p>

    <p>Thanks,</p>
    <p>Sentrei</p>
  `;
  }

  public text(language: User.Language): string {
    if (language === "ja") {
      return "";
    }
    return `
    Hi ${this.name}, you've been invited to join "${this.title}".
    ${this.sender} has invited you to join the space: ${this.title}.
    Click on the link to join now: ${this.link}

    Thanks,
    Sentrei
  `;
  }
}

export default InviteEmail;
