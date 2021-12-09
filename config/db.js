const mongoose = require("mongoose");
require("dotenv").config({ path: "Config\\.env" });

// Database connection
const connectDb = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log(error);
    process.exit(1);
  }
};

mongoose.connection.on("error", (err) => {
  console.error(`Database Error: ${err.message}`);
});

module.exports = { connectDb };
