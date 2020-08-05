import Metadata from "@sentrei/types/models/Metadata";

declare namespace Room {
  export type Types = "breakout" | "focus";

  export type EditableFields = {
    description: string | null;
    name: string;
    photo: string | null;
  };

  interface Fields extends EditableFields {
    emoji?: string;
    type: Types;
    memberCount: number;
    spaceId: string;
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

export default Room;
