import * as functions from "firebase-functions";

import statsUpdate from "@sentrei/functions/helpers/statsUpdate";
import {statsCollection} from "@sentrei/types/models/Analytics";

/**
 * Increase stat count to arbitrary collection
 */

const spaceStatsPlus = functions.firestore
  .document("spaces/{spaceId}/{collection}/{docId}")
  .onCreate((snap, context) => {
    const {collection} = context.params;

    if (!statsCollection.includes(collection)) {
      return false;
    }

    return statsUpdate(collection, snap, 1);
  });

export default spaceStatsPlus;
