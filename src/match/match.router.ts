import * as express from "express";
const router = express.Router();
import { validateAccessToken, checkRequiredPermissions, decodeAccessToken } from "../middleware/auth0.middleware";

import * as matchController from "./match.controller";

router.post("/create", validateAccessToken, decodeAccessToken, matchController.createMatch);

router.get("/", matchController.getMatches);

router.get("/:id", matchController.getMatchById);

router.get("/tournament/:tournament", matchController.getMatchesByTournament);

router.put("/tournament/match/:id", validateAccessToken, decodeAccessToken, matchController.updateTournamentNode);

export default router;