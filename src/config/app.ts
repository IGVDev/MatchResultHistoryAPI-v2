import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import routes from "../routes/Routes";

const app = express();
const jsonParser = bodyParser.json();

app.use(cors());
app.use("/", jsonParser, routes);

export default app;
