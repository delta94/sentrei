export type collection =
  | "actions"
  | "activity"
  | "profiles"
  | "invites"
  | "members"
  | "notifications"
  | "rooms"
  | "spaces"
  | "users"
  | "usernames";

export const statsCollection: collection[] = [
  "actions",
  "activity",
  "profiles",
  "invites",
  "members",
  "notifications",
  "rooms",
  "spaces",
  "users",
  "usernames",
];

declare namespace Analytics {
  export type Stats = {
    [x in collection]?: FirebaseFirestore.FieldValue | number;
  };
}

export default Analytics;
