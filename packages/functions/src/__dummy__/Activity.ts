import {emailInviteResponse} from "@sentrei/functions/__dummy__/Invite";
import {viewerMemberResponse} from "@sentrei/functions/__dummy__/Member";
import {profileGet} from "@sentrei/functions/__dummy__/Profile";
import {roomResponse} from "@sentrei/functions/__dummy__/Room";
import {spaceResponse} from "@sentrei/functions/__dummy__/Space";
import {
  adminTimestamp,
  timestamp,
} from "@sentrei/functions/__mocks__/firebase-testing";
import Activity from "@sentrei/types/models/Activity";

export const activityResponseBase = {
  categoryId: "categoryId",
  createdByUid: "userId",
  spaceId: "spaceId",
  updatedAt: timestamp,
  user: profileGet,
  userNotification: [],
};

export const activitySpaceResponseCreated: Activity.CreateSpace = {
  ...activityResponseBase,
  before: null,
  after: spaceResponse,
  action: "created",
  category: "spaces",
  categoryId: "spaceId",
  createdByUid: "userId",
  fullItemPath: "spaces/spaceId",
  itemPath: "spaces/spaceId",
};

export const activitySpaceResponseUpdated: Activity.UpdateSpace = {
  ...activityResponseBase,
  before: spaceResponse,
  after: spaceResponse,
  action: "updated",
  category: "spaces",
  categoryId: "spaceId",
  createdByUid: "userId",
  fullItemPath: "spaces/spaceId",
  itemPath: "spaces/spaceId",
};

export const activitySpaceResponseDeleted: Activity.DeleteSpace = {
  ...activityResponseBase,
  before: spaceResponse,
  after: null,
  action: "deleted",
  category: "spaces",
  categoryId: "spaceId",
  createdByUid: "userId",
  fullItemPath: "spaces/spaceId",
  itemPath: "spaces/spaceId",
  updatedAt: adminTimestamp,
};

export const activityRoomResponseCreated: Activity.CreateRoom = {
  ...activityResponseBase,
  before: null,
  after: roomResponse,
  action: "created",
  category: "rooms",
  categoryId: "roomId",
  fullItemPath: "spaces/spaceId/rooms/roomId",
  itemPath: "rooms/roomId",
};

export const activityRoomResponseUpdated: Activity.UpdateRoom = {
  ...activityResponseBase,
  before: roomResponse,
  after: roomResponse,
  action: "updated",
  category: "rooms",
  categoryId: "roomId",
  fullItemPath: "spaces/spaceId/rooms/roomId",
  itemPath: "rooms/roomId",
};

export const activityRoomResponseDeleted: Activity.DeleteRoom = {
  ...activityResponseBase,
  before: roomResponse,
  after: null,
  action: "deleted",
  category: "rooms",
  categoryId: "roomId",
  fullItemPath: "spaces/spaceId/rooms/roomId",
  itemPath: "rooms/roomId",
  updatedAt: adminTimestamp,
};

export const activityMemberResponseCreated: Activity.CreateMember = {
  ...activityResponseBase,
  before: null,
  after: viewerMemberResponse,
  action: "created",
  category: "members",
  categoryId: "userId",
  fullItemPath: "spaces/spaceId/members/userId",
  itemPath: "members/userId",
  spaceId: "spaceId",
};

export const activityMemberResponseDeleted: Activity.DeleteMember = {
  ...activityResponseBase,
  before: viewerMemberResponse,
  after: null,
  action: "deleted",
  category: "members",
  categoryId: "userId",
  fullItemPath: "spaces/spaceId/members/userId",
  itemPath: "members/userId",
  updatedAt: adminTimestamp,
};

export const activityInviteResponseCreated: Activity.CreateInvite = {
  ...activityResponseBase,
  before: null,
  after: emailInviteResponse,
  action: "created",
  category: "invites",
  categoryId: "inviteId",
  fullItemPath: "spaces/spaceId/invites/inviteId",
  itemPath: "invites/inviteId",
  spaceId: "spaceId",
};

export const activityInviteResponseDeleted: Activity.DeleteInvite = {
  ...activityResponseBase,
  before: emailInviteResponse,
  after: null,
  action: "deleted",
  category: "invites",
  categoryId: "inviteId",
  fullItemPath: "spaces/spaceId/invites/inviteId",
  itemPath: "invites/inviteId",
  updatedAt: adminTimestamp,
};
