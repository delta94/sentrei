declare namespace Profile {
  export type Fields = {
    name: string;
    photo: string | null;
    username: string;
    emoji?: string;
    description?: string;
  };

  export type Response = Fields;

  export type Update = Partial<Response>;

  export interface Get extends Response {
    uid: string;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Profile;
