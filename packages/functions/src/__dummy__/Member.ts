import {timestamp} from "@sentrei/functions/__mocks__/firebase-testing";
import Member from "@sentrei/types/models/Member";

import {profileResponse, profileGet} from "./Profile";

const baseUpdatedResponse = {
  updatedAt: timestamp,
  updatedBy: profileGet,
  updatedByUid: "userId",
};

const baseMemberResponse = {
  ...baseUpdatedResponse,
  createdAt: timestamp,
  createdBy: profileGet,
  createdByUid: "userId",
  uid: "userId",
  joined: timestamp,
  roomId: null,
  spaceId: "spaceId",
};

export const viewerMemberResponse: Member.Response = {
  ...baseMemberResponse,
  ...profileResponse,
  role: "viewer",
  status: "online",
  type: "spaces",
};

export const moderatorMemberResponse: Member.Response = {
  ...baseMemberResponse,
  ...profileResponse,
  role: "moderator",
  status: "online",
  type: "spaces",
};

export const adminMemberResponse: Member.Response = {
  ...baseMemberResponse,
  ...profileResponse,
  role: "admin",
  status: "online",
  type: "spaces",
};

export const roomMemberResponse: Member.Response = {
  ...baseMemberResponse,
  ...profileResponse,
  roomId: "roomId",
  role: "viewer",
  status: "online",
  type: "spaces",
};

export const memberEmojiUpdate: Member.Update = {
  ...baseUpdatedResponse,
  emoji: "emoji",
};

export const memberDescriptionUpdate: Member.Update = {
  ...baseUpdatedResponse,
  description: "description",
};
