import Email from "@sentrei/types/models/Email";
import User from "@sentrei/types/models/User";

class UpdateEmail {
  public constructor({language, editId, name}: Email.Update) {
    this.language = language;
    this.editId = editId;
    this.name = name;
  }

  language: User.Language;

  editId: string;

  name: string;

  public html(): string {
    if (this.language === "ja") {
      return "";
    }
    return `
    <h1>Hi ${this.name}, you have an update at "${this.editId}".</h1>

    <p>Thanks,</p>
    <p>Sentrei</p>
  `;
  }

  public title(): string {
    if (this.language === "ja") {
      return "";
    }
    return "Update from Sentrei";
  }

  public text(): string {
    if (this.language === "ja") {
      return "";
    }
    return `
    Hi ${this.name}, you have an update at "${this.editId}".

    Thanks,
    Sentrei
  `;
  }
}

export default UpdateEmail;
