import {timestamp} from "@sentrei/functions/__mocks__/firebase-testing";
import Invite from "@sentrei/types/models/Invite";

import {profileResponse, profileGet} from "./Profile";

const baseInviteResponse = {
  createdAt: timestamp,
  createdBy: profileGet,
  createdByUid: "userId",
  uid: "userId",
  joined: timestamp,
  roomId: null,
  spaceId: "spaceId",
  updatedAt: timestamp,
  updatedBy: profileGet,
  updatedByUid: "userId",
};

export const emailInviteResponse: Invite.Response = {
  ...baseInviteResponse,
  ...profileResponse,
  method: "email",
  type: "spaces",
};

export const linkInviteResponse: Invite.Response = {
  ...baseInviteResponse,
  ...profileResponse,
  method: "link",
  type: "spaces",
};
