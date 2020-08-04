import {timestamp} from "@sentrei/functions/__mocks__/firebase-testing";
import Room from "@sentrei/types/models/Room";

import {metadataCreate, metadataResponse, metadataUpdate} from "./Metadata";

export const roomBase = {
  name: "room",
  photo: null,
  description: "room",
  spaceId: "spaceId",
};

export const roomCreate: Room.Create = {
  ...roomBase,
  ...metadataCreate,
  memberCount: 0,
  type: "focus",
};

export const roomResponse: Room.Response = {
  ...roomBase,
  ...metadataResponse,
  joined: timestamp,
  memberCount: 0,
  type: "focus",
};

export const roomUpdate: Room.Update = {
  ...roomBase,
  ...metadataUpdate,
};
