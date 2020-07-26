/* eslint-disable @typescript-eslint/no-explicit-any */

import {IncomingWebhook} from "@slack/webhook";
import * as functions from "firebase-functions";

const config = functions.config().env;

const webhook = new IncomingWebhook(config.slack.notifyBilling);

const eventToBilling = (data: any): JSON => {
  return JSON.parse(Buffer.from(data, "base64").toString());
};

const createSlackMessage = (
  pubsubMessage: any,
  context: any,
): {
  text: string;
  mrkdwn: boolean;
} => {
  const message = {
    text: `Time: ${context.timestamp}\nProjectName: ${pubsubMessage.budgetDisplayName}\nCostAmount: ${pubsubMessage.costAmount}`,
    mrkdwn: true,
  };
  return message;
};

/**
 * Notify billing to slack for project
 */
const notifyBilling = functions.pubsub
  .topic(`sentrei-${config.environment}-billing`)
  .onPublish((event, context) => {
    const pubSubMessage = createSlackMessage(
      eventToBilling(event.data),
      context,
    );
    (async (): Promise<void> => {
      await webhook.send(pubSubMessage);
    })();
  });

export default notifyBilling;
