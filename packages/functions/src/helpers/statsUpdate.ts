import * as admin from "firebase-admin";

import Analytics from "@sentrei/types/models/Analytics";

const statsUpdate = (
  collection: string,
  snap: admin.firestore.DocumentSnapshot,
  value: 1 | -1,
): Promise<FirebaseFirestore.WriteResult> => {
  const ref = admin.firestore().doc("analytics/stats");
  const changes = <Analytics.Stats>{
    [collection]: admin.firestore.FieldValue.increment(value),
  };

  return ref.update(changes);
};

export default statsUpdate;
