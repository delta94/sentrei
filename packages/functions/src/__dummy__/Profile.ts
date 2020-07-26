import Profile from "@sentrei/types/models/Profile";

export const profileGet: Profile.Get = {
  uid: "userId",
  name: "profileUser",
  username: "userId",
  photo: null,
};

export const profileResponse: Profile.Response = {
  name: "profileUser",
  username: "userId",
  photo: null,
};
