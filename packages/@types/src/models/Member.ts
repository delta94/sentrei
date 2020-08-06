import firebase from "firebase";

import Metadata from "@sentrei/types/models/Metadata";
import Profile from "@sentrei/types/models/Profile";

declare namespace Member {
  export type Collections = "spaces" | "rooms";
  export type Status = "online" | "offline" | "away";

  export type EditableFields = {
    emoji?: string;
    role: "admin" | "moderator" | "viewer";
    status: Status;
  };

  interface Fields extends EditableFields {
    type: Collections;
    roomId: string | null;
    spaceId: string;
  }

  export interface Create extends Fields, Profile.Get, Metadata.Create {}

  export interface Request extends Fields, Profile.Get, Metadata.Get {}

  export interface Response extends Fields, Profile.Get, Metadata.Response {
    joined: firebase.firestore.Timestamp;
  }

  export interface Update extends Partial<EditableFields>, Metadata.Update {}

  export interface Get extends Omit<Response, "joined">, Metadata.Get {
    id: string;
    joined: string | null;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Member;
