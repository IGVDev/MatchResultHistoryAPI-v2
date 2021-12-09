const express = require("express");
const app = express();
// const errorHandler = require("../middlewares/errorHandler");
const bodyParser = require("body-parser");
const routes = require("../routes/MatchRoutes");
const jsonParser = bodyParser.json();
const cors = require("cors");

app.use(cors());
// app.use(errorHandler);
app.use("/", jsonParser, routes);

module.exports = app;
