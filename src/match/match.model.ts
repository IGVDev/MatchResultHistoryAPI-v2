import mongoose from "mongoose";
const MatchesSchema = new mongoose.Schema(
  {
    league: {

    },
    tournament: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    user1: {
      type: String,
    },
    user2: {
      type: String,
    },
    user3: {
      type: String
    },
    user4: {
      type: String
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
      default: 0,
    },
    result2: {
      type: Number,
      default: 0,
    },
    winner: {
      type: String,
    },
    played: {
      type: Boolean,
      default: false,
    },
    previousRoundMatchIds: {
      type: [String],
    },
    nextRoundMatchId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("newmatches", MatchesSchema);
