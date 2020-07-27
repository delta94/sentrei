import Email from "@sentrei/types/models/Email";
import User from "@sentrei/types/models/User";

class UpdateEmail {
  public constructor({editId, name}: Email.Update) {
    this.editId = editId;
    this.name = name;
  }

  editId: string;

  name: string;

  public html(language: User.Language): string {
    if (language === "ja") {
      return "";
    }
    return `
    <h1>Hi ${this.name}, you have an update at "${this.editId}".</h1>

    <p>Thanks,</p>
    <p>Sentrei</p>
  `;
  }

  public subject(language: User.Language): string {
    if (language === "ja") {
      return "";
    }
    return `Update from Sentrei at ${this.editId}`;
  }

  public text(language: User.Language): string {
    if (language === "ja") {
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
