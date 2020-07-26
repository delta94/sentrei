import {IncomingWebhook} from "@slack/webhook";
import * as functions from "firebase-functions";

const config = functions.config().env;

const webhook = new IncomingWebhook(config.slack.notifySignup);

/**
 * Notify signup to slack
 */
const notifySignup = functions.auth.user().onCreate(event => {
  (async (): Promise<void> => {
    await webhook.send({
      text: `Environment: ${
        config.environment
      }\nSignup: ${event.email.toString()}\nMetadata: ${event.metadata
        .toJSON()
        .toString()}`,
    });
  })();
});

export default notifySignup;
