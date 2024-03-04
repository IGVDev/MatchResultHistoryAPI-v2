import { Request, Response } from "express";
import * as MatchServices from "./match.services";

interface ModifiedRequest extends Request {
  user: {
    email: string;
  }
}

export const baseRoute = async (req: Request, res: Response): Promise<void> => {
  res.send(`IT'S ALIVE`);
};

export const getMatches = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { league, year } = req.params;
  const matches = await MatchServices.getMatchesService(league, year);
  res.json(matches);
};

export const getStandings = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { league, year } = req.params;
  const standings = await MatchServices.getStandingsService(league, year);
  res.json(standings);
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { league } = req.params;
  const users = await MatchServices.getUsersService(league);
  res.json(users);
};

export const createMatch = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newMatch = await MatchServices.createMatchService(req, res);
  res.json(newMatch);
};

export const getMatchesByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const username = req.params.username;
  const matches = await MatchServices.getMatchesByUsernameService(username);
  res.json(matches);
};

export const getMatchById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const match = await MatchServices.getMatchByIdService(id);
  res.json(match);
};

export const getMatchesByTournament = async (
  req: Request,
  res: Response
): Promise<void> => {
  const tournament = req.params.tournament;
  const matches = await MatchServices.getMatchesByTournamentService(tournament);
  res.json(matches);
}

export const updateMatch = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const match = await MatchServices.updateMatchService(id, req, res);
  res.json(match);
};

export const deleteMatch = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const match = await MatchServices.deleteMatchService(id);
  res.json(match);
};

export const updateTournamentNode = async (
  req: ModifiedRequest,
  res: Response
): Promise<void> => {
  const matchId = req.params.id;
  const email = req.user.email;
  const body = req.body;
  const match = await MatchServices.updateTournamentNode({ matchId, body, email });
  res.json(match);
};

