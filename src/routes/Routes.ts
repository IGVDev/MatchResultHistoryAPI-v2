import * as express from "express";
const router = express.Router();
// const errorHandler = require("../middlewares/errorHandler");

import * as matchController from "../controllers/MatchController";
import * as adminController from "../controllers/AdminController";

// Admin routes

router.post("/admin/login", adminController.adminLogin);

// Match routes
router.get("/", matchController.baseRoute);

router.post("/createMatch", matchController.createMatch);

router.get("/getMatches/:league?/:year?", matchController.getMatches);

router.get("/getStandings/:league?/:year?", matchController.getStandings);

router.get("/getUsers/:league?", matchController.getUsers);

router.get(
  "/getMatchesByUser/:username/:league?/:year?",
  matchController.getMatchesByUser
);

router.get("/getMatchById/:id", matchController.getMatchById);

router.put("/updateMatch/:id", matchController.updateMatch);

router.delete("/deleteMatch/:id", matchController.deleteMatch);

export default router;
