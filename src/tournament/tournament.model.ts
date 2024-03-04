import mongoose from "mongoose";

const TournamentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        league: {
            name: {
                type: String,
                required: true,
            },
            id: {
                type: String,
                required: true,
            },
        },
        teams: {
            type: [String],
            required: true,
        },
        matches: {
            type: [mongoose.Schema.Types.ObjectId],
        },
        finished: {
            type: Boolean,
            default: false,
        },
    }
);

export default mongoose.model("tournaments", TournamentSchema);