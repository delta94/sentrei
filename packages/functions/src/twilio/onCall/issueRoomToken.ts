import * as functions from "firebase-functions";
import * as twilio from "twilio";

const config = functions.config().env;

const MAX_ALLOWED_SESSION_DURATION = 14400;

/**
 * Issue Twilio Video Room Token
 */
export const issueRoomToken = functions.https.onCall((data, context) => {
  const uid = context.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You need to be logged in to continue.",
    );
  }

  const {identity, roomId} = data;

  if (!roomId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "roomI is required!",
    );
  }

  if (!identity) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "identity is required!",
    );
  }

  const {AccessToken} = twilio.jwt;

  const token = new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKeySid,
    config.twilio.apiKeySecret,
    {identity, ttl: MAX_ALLOWED_SESSION_DURATION},
  );

  token.addGrant(new AccessToken.VideoGrant({room: data.roomId}));
  return token.toJwt();
});

export default issueRoomToken;
