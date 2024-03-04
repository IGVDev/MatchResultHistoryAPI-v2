import * as express from "express";
const router = express.Router();
import { validateAccessToken, checkRequiredPermissions, decodeAccessToken } from "../middleware/auth0.middleware";
import * as tournamentController from "./tournament.controller";

router.post("/create", validateAccessToken, decodeAccessToken, tournamentController.createTournament);

router.get("/", tournamentController.getTournaments);

router.get("/:id", tournamentController.getTournament);

export default router;