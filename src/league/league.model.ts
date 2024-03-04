import mongoose from "mongoose";
const LeagueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        players: {
            type: Array,
            default: [],
        },
        tournaments: {
            type: Array,
            default: [],
        },
        editors: {
            type: Array,
            required: true,
        }
    },
    { timestamps: true }
);

export default mongoose.model("leagues", LeagueSchema);