import { Request, Response } from 'express';
import * as TournamentServices from './tournament.services';
import Leagues from '../league/league.model';

interface ModifiedRequest extends Request {
    user: {
        email: string;
    }
}

export const createTournament = async (req: ModifiedRequest, res: Response): Promise<void> => {
    const league = await Leagues.findById(req.body.league);

    if (league.editors && !league.editors.includes(req.user.email)) {
        res.status(403).send('You do not have permission to create a tournament in this league');
        return;
    }
    const newTournament = await TournamentServices.createTournamentService(req.body, league);

    league.tournaments.push(newTournament._id);
    await league.save();
    res.json(newTournament);
}

export const getTournaments = async (req: Request, res: Response): Promise<void> => {
    const tournaments = await TournamentServices.getTournamentsService();
    res.json(tournaments);
}

export const getTournament = async (req: Request, res: Response): Promise<void> => {
    const tournament = await TournamentServices.getTournamentById(req.params.id);
    res.json(tournament);
}


