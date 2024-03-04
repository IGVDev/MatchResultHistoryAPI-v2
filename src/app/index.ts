import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "../routes/Routes";
import leagueRoutes from "../league/league.router";
import tournamentRoutes from "../tournament/tournament.routes";
import matchRoutes from "../match/match.router";

const app = express();
const jsonParser = bodyParser.json();

app.use(cors());
app.use("/", jsonParser, routes);
app.use("/leagues", jsonParser, leagueRoutes);
app.use('/tournaments', jsonParser, tournamentRoutes)
app.use('/matches', jsonParser, matchRoutes)

export default app;
