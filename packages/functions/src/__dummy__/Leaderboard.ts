import {profileGet} from "@sentrei/functions/__dummy__/Profile";
import Leaderboard from "@sentrei/types/models/Leaderboard";

// eslint-disable-next-line import/prefer-default-export
export const leaderboardResponse: Leaderboard.Response = {
  ...profileGet,
  score: 300,
};
