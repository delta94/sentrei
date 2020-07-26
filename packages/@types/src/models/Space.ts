import Metadata from "@sentrei/types/models/Metadata";

declare namespace Space {
  export type Tiers = "free" | "pro" | "enterprise";

  export type EditableFields = {
    description: string | null;
    name: string;
    photo: string | null;
  };

  interface Fields extends EditableFields {
    inviteCount?: FirebaseFirestore.FieldValue | number;
    memberCount: FirebaseFirestore.FieldValue | number;
    tier: Tiers;
  }

  export type AdminUpdate = Partial<Fields>;

  export interface Create extends Fields, Metadata.Create {}

  export interface Update extends Partial<EditableFields>, Metadata.Update {}

  export interface Response extends Fields, Metadata.Response {
    joined: firebase.firestore.Timestamp;
  }

  export interface Get extends Fields, Metadata.Get {
    id: string;
    inviteCount?: number;
    memberCount: number;
    joined: string | null;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Space;
