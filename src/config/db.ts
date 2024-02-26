import mongoose from "mongoose";
require("dotenv").config({ path: "src\\config\\.env" });

// Database connection
export const connectDb = async () => {
  try {
    mongoose.connect(
      process.env.MONGODB_URI,
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

mongoose.connection.on("error", (err) => {
  console.error(`Database Error: ${err.message}`);
});

mongoose.connection.once("open", () => {
  console.log("Connected to Database");
});

