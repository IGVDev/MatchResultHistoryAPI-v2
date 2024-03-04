import * as express from "express";
const router = express.Router();

import * as matchController from "../match/match.controller";
import * as adminController from "../admin/controller";

import { validateAccessToken, checkRequiredPermissions } from "../middleware/auth0.middleware";
import { AdminMessagesPermissions } from "../admin/admin-permissions";

// Admin routes

router.post("/admin/login", adminController.adminLogin);

// Match routes
router.get("/", matchController.baseRoute);

router.post("/createMatch", validateAccessToken, matchController.createMatch);

router.get("/getMatches/:league?/:year?", matchController.getMatches);

router.get("/getStandings/:league?/:year?", matchController.getStandings);

router.get("/getUsers/:league?", matchController.getUsers);

router.get(
  "/getMatchesByUser/:username/:league?/:year?",
  matchController.getMatchesByUser
);

router.get("/getMatchById/:id", matchController.getMatchById);

router.put("/updateMatch/:id", validateAccessToken, matchController.updateMatch);

router.delete("/deleteMatch/:id", validateAccessToken, matchController.deleteMatch);

router.get("/getProtectedTestMessage", validateAccessToken, (req, res) => {
  res.send("You have a valid access token");
});

export default router;
