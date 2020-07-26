import * as functions from "firebase-functions";

import statsUpdate from "@sentrei/functions/helpers/statsUpdate";
import {statsCollection} from "@sentrei/types/models/Analytics";

/**
 * Decrease stat count to arbitrary collection
 */
const statsMinus = functions.firestore
  .document("{collection}/{docId}")
  .onDelete((snap, context) => {
    const {collection} = context.params;

    if (!statsCollection.includes(collection)) {
      return false;
    }

    return statsUpdate(collection, snap, -1);
  });

export default statsMinus;
