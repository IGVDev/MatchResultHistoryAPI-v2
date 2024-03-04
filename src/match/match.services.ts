import { Response, Request } from "express";
import Matches from "./match.model";
import _ from "underscore";
import { ObjectId } from "mongoose";
import leagueModel from "../league/league.model";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

type Match = {
  user1: string;
  user2: string;
  result1: number;
  result2: number;
  league: string;
  createdAt: Date;
  updatedAt: Date;
};

export const createMatchService = (
  req: Request,
  res: Response
): Promise<string> => {
  try {
    new Matches(req.body).save();
    return Promise.resolve("SUCCESS");
  } catch (error) {
    console.log(error);
  }
};

export const getMatchesService = async (
  league: string,
  year?: string
): Promise<Match[]> => {
  let filter: Object = {};
  if (year) {
    const start = new Date(parseInt(year), 1, 1);
    const end = new Date(parseInt(year), 12, 31);
    filter = {
      createdAt: { $gte: start, $lt: end },
    };
  }
  if (league) {
    filter = { ...filter, league: league };
  }
  return await Matches.find(filter).lean();
};

export const getUsersService = async (league: string): Promise<string[]> => {
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

export const getStandingsService = async (
  league: string,
  year?: string
): Promise<Match[]> => {
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
      let { user1, user2, result1, result2 } = match;
      let home = _.find(standings, { name: capitalize(user1) });
      let away = _.find(standings, { name: capitalize(user2) });
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
        home.winPercent = ((home.gamesWon / home.gamesPlayed) * 100).toFixed(2);
        away.gamesLost++;
        away.winPercent = ((away.gamesWon / away.gamesPlayed) * 100).toFixed(2);
      } else if (result1 === result2) {
        home.points += 1;
        home.gamesTied++;
        home.winPercent = ((home.gamesWon / home.gamesPlayed) * 100).toFixed(2);
        away.points += 1;
        away.gamesTied++;
        away.winPercent = ((away.gamesWon / away.gamesPlayed) * 100).toFixed(2);
      } else {
        home.gamesLost++;
        home.winPercent = ((home.gamesWon / home.gamesPlayed) * 100).toFixed(2);
        away.points += 3;
        away.gamesWon++;
        away.winPercent = ((away.gamesWon / away.gamesPlayed) * 100).toFixed(2);
      }
    }
    return standings;
  });
};

export const getMatchByIdService = async (id: string): Promise<Match> => {
  try {
    return await Matches.findById({ _id: id }).lean();
  } catch (error) {
    console.log(error);
  }
};

export const getMatchesByUsernameService = async (
  username: string
): Promise<Match[]> => {
  try {
    return await Matches.find({
      $or: [{ user1: username }, { user2: username }],
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateMatchService = async (
  id: string,
  req: Request,
  res: Response
): Promise<string> => {
  try {
    await Matches.findByIdAndUpdate({ _id: id }, { $set: req.body });
    return "EDITED SUCCESSFULLY";
  } catch (error) {
    console.log(error);
  }
};

export const updateTournamentNode = async (matchId: string, body, email) => {
  try {
    let match = await Matches.findById({ _id: matchId }).lean();
    const league = await leagueModel.findById({ _id: match.league.id });

    if (league.editors && !league.editors.includes(email)) {
      return "You do not have permission to edit this league";
    }

    match = { ...match, ...body };
    await Matches.findByIdAndUpdate({ _id: matchId }, { $set: match });

    const { nextRoundMatchId, previousRoundMatchIds } = match;
    if (nextRoundMatchId) {
      // check match for teams already filled
      const nextMatch = await Matches.findById({ _id: nextRoundMatchId }).lean();
      if (nextMatch.team1 === "TBD") {
        // check if previous matches are filled
        nextMatch.team1 = match.winner;
        await
          Matches.findByIdAndUpdate({ _id: nextRoundMatchId }, { $set: nextMatch });
      } else if (nextMatch.team2 === "TBD") {
        nextMatch.team2 = match.winner;
        await
          Matches.findByIdAndUpdate({ _id: nextRoundMatchId }, { $set: nextMatch });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export const getMatchesByTournamentService = async (
  tournament: string) => {
  try {
    const matches = await Matches.find({
      "tournament.id": tournament
    }).lean();
    return matches;
  } catch (error) {
    console.log(error);
  }
}

export const deleteMatchService = async (id: string): Promise<string> => {
  try {
    await Matches.findByIdAndDelete({ _id: id });
    return "DELETED";
  } catch (error) {
    console.log(error);
  }
};
