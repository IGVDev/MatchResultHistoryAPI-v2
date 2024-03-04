import * as express from "express";
const router = express.Router();
import { validateAccessToken, checkRequiredPermissions, decodeAccessToken } from "../middleware/auth0.middleware";
import * as leagueController from "./league.controller";
import { LeaguePermissions } from "./league.permissions";

router.post("/create", validateAccessToken, decodeAccessToken, leagueController.createLeague);

router.get("/user", validateAccessToken, decodeAccessToken, leagueController.getLeaguesByUser);

router.get("/", leagueController.getLeagues);

router.get("/:id", leagueController.getLeague);

router.put("/:id", validateAccessToken, checkRequiredPermissions(LeaguePermissions.edit), decodeAccessToken, leagueController.updateLeague);

router.delete("/:id", validateAccessToken, checkRequiredPermissions(LeaguePermissions.edit), decodeAccessToken, leagueController.deleteLeague);

export default router;