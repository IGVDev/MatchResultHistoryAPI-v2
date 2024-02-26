const { connectDb } = require("./src/config/db");
const app = require("./src/config/app");
connectDb();

const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`Running on ${server.address().port}`);
});
