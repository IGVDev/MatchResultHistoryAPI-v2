import { connectDb } from "./src/config/db";
import app from "./src/app/index";
connectDb();

const server = app.listen(process.env.PORT || 3001, () => {
  const address = server.address();
  const port = typeof address === 'string' ? address : address?.port;
  console.log(`Running on ${port}`);
});