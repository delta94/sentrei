import mailClient from "@sendgrid/mail";
import * as functions from "firebase-functions";

const config = functions.config().env;

mailClient.setApiKey(config.sendgrid.apiKey);

const contentTemplate = {
  en: "d-864599b39c334c97a7a1078ec95e53d2",
};

export default mailClient;

export {contentTemplate};
