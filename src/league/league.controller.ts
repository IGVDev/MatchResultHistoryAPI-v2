import { Request, Response } from 'express';
import * as LeagueServices from './league.services';

interface ModifiedRequest extends Request {
    user: {
        email: string;
    }
}

export const createLeague = async (req: ModifiedRequest, res: Response): Promise<void> => {
    const newLeague = await LeagueServices.createLeagueService(req.body, req.user.email);
    res.json(newLeague);
};

export const getLeagues = async (req: Request, res: Response): Promise<void> => {
    const leagues = await LeagueServices.getLeaguesService();
    res.json(leagues);
};

export const getLeague = async (req: Request, res: Response): Promise<void> => {
    const league = await LeagueServices.getLeagueService(req.params.id);
    res.json(league);
};

export const getLeaguesByUser = async (req: ModifiedRequest, res: Response): Promise<void> => {
    const leagues = await LeagueServices.getLeaguesByUserService(req.user.email);
    res.json(leagues);
};

export const updateLeague = async (req: ModifiedRequest, res: Response): Promise<void> => {
    const updatedLeague = await LeagueServices.updateLeagueService(req.params.id, req.body, req.user.email);
    res.json(updatedLeague);
};

export const deleteLeague = async (req: ModifiedRequest, res: Response): Promise<void> => {
    const deletedLeague = await LeagueServices.deleteLeagueService(req.params.id, req.user.email);
    res.json(deletedLeague);
};