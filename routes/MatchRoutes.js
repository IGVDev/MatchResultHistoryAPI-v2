const express = require("express");
const router = express.Router();
// const errorHandler = require("../middlewares/errorHandler");

const matchController = require("../controllers/MatchController");

// router.all("*", errorHandler);

router.get("/", matchController.baseRoute);

router.post("/createMatch", matchController.createMatch);

router.get("/getMatches/:league?/:year?", matchController.getMatches);

router.get("/getStandings/:league?/:year?", matchController.getStandings);

router.get(
  "/getMatchesByUser/:username/:league?/:year?",
  matchController.getMatchesByUser
);

router.get("/getMatchById/:id", matchController.getMatchById);

router.put("/updateMatch/:id", matchController.updateMatch);

router.delete("/deleteMatch/:id", matchController.deleteMatch);

module.exports = router;
