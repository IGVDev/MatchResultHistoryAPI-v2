import mongoose from "mongoose";
const MatchesSchema = new mongoose.Schema(
  {
    league: {
      type: String,
      required: true,
    },
    user1: {
      type: String,
      required: true,
    },
    user2: {
      type: String,
      required: true,
    },
    team1: {
      type: String,
      required: true,
    },
    team2: {
      type: String,
      required: true,
    },
    result1: {
      type: Number,
      required: true,
    },
    result2: {
      type: Number,
      required: true,
    },
    winner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("matches", MatchesSchema);
