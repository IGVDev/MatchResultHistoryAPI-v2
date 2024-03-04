import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  createdLeagues: { type: [String], default: [] },
  leagues: { type: [String], default: [] },
  subscription: { type: String, default: "free" }
}, {
  timestamps: true
});

export default model("User", UserSchema);
