const express = require("express");
const router = express.Router();
// const errorHandler = require("../middlewares/errorHandler");

const matchController = require("../controllers/MatchController");
const adminController = require("../controllers/AdminController");

// router.all("*", errorHandler);

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

module.exports = router;
