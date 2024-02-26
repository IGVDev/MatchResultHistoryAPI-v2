const MatchServices = require("../services/MatchServices");

const baseRoute = async (req, res) => {
  res.send(`IT'S ALIVE`);
};

const getMatches = async (req, res) => {
  const { league, year } = req.params;
  const matches = await MatchServices.getMatchesService(req);
  res.json(matches);
};

const getStandings = async (req, res) => {
  const { league, year } = req.params;
  const standings = await MatchServices.getStandingsService(req, league, year);
  res.json(standings);
};

const getUsers = async (req, res) => {
  const { league } = req.params;
  const users = await MatchServices.getUsersService(req, league);
  res.json(users);
};

const createMatch = async (req, res) => {
  const newMatch = await MatchServices.createMatchService(req);
  res.json(newMatch);
};

const getMatchesByUser = async (req, res) => {
  const username = req.params.username;
  const matches = await MatchServices.getMatchesByUsernameService(username);
  res.json(matches);
};

const getMatchById = async (req, res) => {
  const id = req.params.id;
  const match = await MatchServices.getMatchByIdService(id);
  res.json(match);
};

const updateMatch = async (req, res) => {
  const id = req.params.id;
  const match = await MatchServices.updateMatchService(id);
  res.json(match);
};

const deleteMatch = async (req, res) => {
  const id = req.params.id;
  const match = await MatchServices.deleteMatchService(id);
  res.json(match);
};

module.exports = {
  baseRoute,
  getMatches,
  getStandings,
  getUsers,
  createMatch,
  getMatchesByUser,
  getMatchById,
  updateMatch,
  deleteMatch,
};
