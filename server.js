const { connectDb } = require("./config/db");
const app = require("./config/app");
connectDb();

const server = app.listen(3000, () => {
  console.log(`Running on ${server.address().port}`);
});
