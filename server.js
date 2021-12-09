const { connectDb } = require("./Config/db");
const app = require("./Config/app");
connectDb();

const server = app.listen(3000, () => {
  console.log(`Running on ${server.address().port}`);
});
