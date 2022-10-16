const Matches = require("../models/MatchesModel");
const _ = require("underscore");

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const createMatchService = (req) => {
  try {
    new Matches(req.body).save();
    return "SUCCESS";
  } catch (error) {
    console.log(error);
  }
};

const getMatchesService = async (req, res, next) => {
  let filter;
  let { year, league } = req.params;
  if (year) {
    const start = new Date(year, 1, 1);
    const end = new Date(year, 12, 31);
    filter = {
      createdAt: { $gte: start, $lt: end },
    };
  }
  if (league) {
    filter = { ...filter, league: league };
  }
  return await Matches.find(filter).lean();
};

const getUsersService = async (league) => {
  try {
    return await getMatchesService(league).then((matches) => {
      let users = [];
      for (let match of matches) {
        if (!users.includes(match.user1)) {
          users.push(match.user1);
        }
        if (!users.includes(match.user2)) {
          users.push(match.user2);
        }
      }
      return users;
    });
  } catch (error) {
    console.log(error);
  }
};

const getStandingsService = async (league, year) => {
  return await getMatchesService(league, year).then((matches) => {
    let users = [];
    let standings = [];
    let i = 0;
    // Extract usernames from matches
    for (let match of matches) {
      if (!users.includes(match.user1)) {
        users.push(match.user1);
      }
      if (!users.includes(match.user2)) {
        users.push(match.user2);
      }
    }
    // Build users data table
    for (let user of users) {
      standings.push({
        name: capitalize(users[i]),
        gamesPlayed: 0,
        points: 0,
        gamesWon: 0,
        gamesTied: 0,
        gamesLost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDif: 0,
        winPercent: 0,
      });
      i++;
    }
    // Populate users data table
    for (let match of matches) {
      let {user1, user2, result1, result2} = match;
      let home = _.find(standings, {name: capitalize(user1)});
      let away = _.find(standings, {name: capitalize(user2)});
      home.gamesPlayed++;
      home.goalsFor += result1;
      home.goalsAgainst += result2;
      home.goalDif = home.goalsFor - home.goalsAgainst;
      away.gamesPlayed++;
      away.goalsFor += result2;
      away.goalsAgainst += result1;
      away.goalDif = away.goalsFor - away.goalsAgainst;
      if (result1 > result2) {
        home.points += 3;
        home.gamesWon++;
        home.winpercent = ((home.gamesWon / home.gamesPlayed) * 100).toFixed(2);
        away.gamesLost++;
        away.winpercent = ((away.gamesWon / away.gamesPlayed) * 100).toFixed(2);
      } else if (result1 === result2) {
        home.points += 1;
        home.gamesTied++;
        home.winpercent = ((home.gamesWon / home.gamesPlayed) * 100).toFixed(2);
        away.points += 1;
        away.gamesTied++;
        away.winpercent = ((away.gamesWon / away.gamesPlayed) * 100).toFixed(2);
      } else {
        home.gamesLost++;
        home.winpercent = ((home.gamesWon / home.gamesPlayed) * 100).toFixed(2);
        away.points += 3;
        away.gamesWon++;
        away.winpercent = ((away.gamesWon / away.gamesPlayed) * 100).toFixed(2);
      }
    }
    return standings;
  });
};

const getMatchByIdService = async (id) => {
  try {
    return await Matches.findById({_id: id});
  } catch (error) {
    console.log(error);
  }
};

const getMatchesByUsernameService = async (username) => {
  try {
    return await Matches.find({
      $or: [{user1: username}, {user2: username}],
    });
  } catch (error) {
    console.log(error);
  }
};

const updateMatchService = async (id, req) => {
  try {
    await Matches.findByIdAndUpdate({ _id: id }, { $set: req.body });
    return "EDITED SUCCESSFULLY";
  } catch (error) {
    console.log(error);
  }
};

const deleteMatchService = async (id) => {
  try {
    await Matches.findByIdAndDelete({ _id: id });
    return "DELETED";
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMatchesService,
  getStandingsService,
  getUsersService,
  createMatchService,
  getMatchByIdService,
  getMatchesByUsernameService,
  updateMatchService,
  deleteMatchService,
};
