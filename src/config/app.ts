import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import routes from "../routes/Routes";

const app = express();
const jsonParser = bodyParser.json();

app.use((err, request, response, next) => {
    // log the error, for now just console.log
    console.log(err)
    response.status(500).send('Something broke!')
  })

app.use(cors());
app.use("/", jsonParser, routes);

export default app;
