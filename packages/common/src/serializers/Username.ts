/* eslint-disable @typescript-eslint/no-non-null-assertion */

import Username from "@sentrei/types/models/Username";

const serializeUsername = (
  snap: firebase.firestore.DocumentSnapshot<Username>,
): Username => {
  const data = snap.data()!;

  return {
    ...data,
  };
};

export default serializeUsername;
