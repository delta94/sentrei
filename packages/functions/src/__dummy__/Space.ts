import {timestamp} from "@sentrei/functions/__mocks__/firebase-testing";
import Space from "@sentrei/types/models/Space";

import {metadataCreate, metadataResponse, metadataUpdate} from "./Metadata";

export const spaceBase = {
  name: "space",
  photo: null,
  description: "space",
};

export const spaceCreate: Space.Create = {
  ...spaceBase,
  ...metadataCreate,
  memberCount: 0,
  tier: "free",
};

export const spaceResponse: Space.Response = {
  ...spaceBase,
  ...metadataResponse,
  joined: timestamp,
  memberCount: 0,
  tier: "free",
};

export const spaceUpdate: Space.Update = {
  ...spaceBase,
  ...metadataUpdate,
};
