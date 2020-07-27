import Metadata from "@sentrei/types/models/Metadata";

declare namespace Invite {
  export type Collections = "spaces" | "rooms";
  export type Methods = "email" | "link";
  export type Period = "day" | "week" | "never";

  export type EditableFields = {
    email?: string;
  };

  interface Fields extends EditableFields {
    method: Methods;
    spaceId: string;
    type: Collections;
    period?: Period;
    window?: string;
  }

  export interface Create extends Fields, Metadata.Create {}

  export interface Update extends Partial<EditableFields>, Metadata.Update {}

  export interface Response extends Fields, Metadata.Response {
    joined: firebase.firestore.Timestamp;
  }

  export interface Get extends Fields, Metadata.Get {
    id: string;
    joined: string | null;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Invite;
