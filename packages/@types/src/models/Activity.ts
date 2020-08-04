import Invite from "@sentrei/types/models/Invite";
import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";

export type UserAction = "created" | "updated" | "deleted";

type EditableContent = "invites" | "members" | "rooms" | "spaces";

type EditableContentType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in EditableContent]: any;
};

export type ContentCategory = EditableContent;

declare namespace Activity {
  interface Fields<T, C extends keyof EditableContentType> {
    action: UserAction;
    before: T | null;
    after: T | null;
    category: C;
    categoryId: string;
    createdByUid: string;
    fullItemPath: string;
    itemPath: string;
    language?: User.Language;
    spaceId: string;
    updatedAt: firebase.firestore.FieldValue;
    user: Profile.Response;
    userNotification: string[];
  }

  interface Create<T, C extends keyof EditableContentType>
    extends Fields<T, C> {
    action: "created";
    before: null;
    after: T;
  }

  interface Update<T, C extends keyof EditableContentType>
    extends Fields<T, C> {
    action: "updated";
    before: T;
    after: T;
  }

  interface Delete<T, C extends keyof EditableContentType>
    extends Fields<T, C> {
    action: "deleted";
    before: T;
    after: null;
  }

  export type CreateInvite = Create<Invite.Response, "invites">;
  export type DeleteInvite = Delete<Invite.Response, "invites">;
  export type CreateMember = Create<Member.Response, "members">;
  export type DeleteMember = Delete<Member.Response, "members">;
  export type CreateRoom = Create<Room.Response, "rooms">;
  export type UpdateRoom = Update<Room.Response, "rooms">;
  export type DeleteRoom = Delete<Room.Response, "rooms">;
  export type CreateSpace = Create<Space.Response, "spaces">;
  export type UpdateSpace = Update<Space.Response, "spaces">;
  export type DeleteSpace = Delete<Space.Response, "spaces">;

  export type CreateActions =
    | CreateInvite
    | CreateMember
    | CreateRoom
    | CreateSpace;

  export type UpdateActions = UpdateRoom | UpdateSpace;

  export type DeleteActions =
    | DeleteInvite
    | DeleteMember
    | DeleteRoom
    | DeleteSpace;

  export type Response = Omit<
    CreateActions | UpdateActions | DeleteActions,
    "updatedAt"
  > & {
    updatedAt: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
  };

  export type Get = Omit<Response, "updatedAt"> & {
    id: string;
    updatedAt: string;
  };

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Activity;
