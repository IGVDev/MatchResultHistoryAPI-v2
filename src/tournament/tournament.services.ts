import { ObjectId } from 'mongoose';

interface ITournament {
    _id?: string;
    name: string;
    league: any;
    teams: string[];
    matches?: ObjectId[];
    finished?: boolean;
    type: string;
}

import Tournament from './tournament.model';
import Match from '../match/match.model';

const randomize = (array: any[]) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const createMatches = async (teams: string[], tournament: any, league: any) => {
    let matches = [];
    const totalTeams = teams.length;
    let remainingTeams = totalTeams;

    let totalRounds = 0;
    while (remainingTeams > 1) {
        totalRounds++;
        remainingTeams /= 2;
    }

    for (let i = 0; i < totalRounds; i++) {
        matches.push([]);
    }

    const shuffledTeams = randomize(teams);
    remainingTeams = totalTeams;
    for (let i = 0; i < totalRounds; i++) {
        const roundMatches = [];
        const roundTeams = remainingTeams / 2;

        for (let j = 0; j < roundTeams; j++) {
            const match = {
                league: { id: league.id, name: league.name },
                tournament: { id: tournament.id, name: tournament.name },
                team1: shuffledTeams[j * 2] || "TBD",
                team2: shuffledTeams[j * 2 + 1] || "TBD",
                round: i + 1
            };

            roundMatches.push(match);
        }
        matches[i] = roundMatches;
        shuffledTeams.splice(0, roundTeams * 2);
        remainingTeams /= 2;
    }

    return matches;
};

const _createMatches = async (teams: string[], tournament: any, league: any) => {
    let matches = [];
    matches.fill({ league: { id: league.id, name: league.name }, tournament: { id: tournament.id, name: tournament.name }, team1: "TBD", team2: "TBD" }, 0);
    const shuffledTeams = randomize(teams);
    for (let i = 0; i < matches.length; i++) {
        const match = {
            league: { id: tournament.id, name: tournament.name },
            tournament: { id: tournament.id, name: tournament.name },
            team1: shuffledTeams[i * 2] || "TBD",
            team2: shuffledTeams[i * 2 + 1] || "TBD",
        }

        matches[i / 2] = match;
    }

    return matches;
}

const saveMatches = async (matchesByRound: any[]) => {
    let matchIdsArr = [];
    for (let roundMatches of matchesByRound) {
        let matchIds = [];
        for (let match of roundMatches) {
            const newMatch = new Match(match);
            await newMatch.save();

            matchIds.push(newMatch._id);
        }
        matchIdsArr.push(matchIds);
    }
    return matchIdsArr;
}

const updateMatchLinks = async (matchesByRound: any[]) => {
    for (let i = 0; i < matchesByRound.length; i++) {
        const currentRoundMatches = matchesByRound[i];
        const nextRoundMatches = matchesByRound[i + 1];
        for (let j = 0; j < currentRoundMatches.length; j++) {

            const currentMatch = currentRoundMatches[j];
            const nextRoundMatch = nextRoundMatches ? nextRoundMatches[Math.floor(j / 2)] : null;

            const match = await Match.findById(currentMatch._id); // Retrieve Match document from the database
            if (match) {
                if (nextRoundMatch) {
                    match.nextRoundMatchId = nextRoundMatch._id; // Set nextRoundMatchId
                }
                if (i > 0) {
                    const prevRoundMatches = matchesByRound[i - 1];
                    const prevMatch1 = prevRoundMatches.find((prevMatch, index) => index === j * 2);
                    const prevMatch2 = prevRoundMatches.find((prevMatch, index) => index === j * 2 + 1);
                    if (prevMatch1 && prevMatch2) {
                        match.previousRoundMatchIds = [prevMatch1._id, prevMatch2._id]; // Set previousRoundMatchIds
                    }
                }
                await match.save(); // Update the match with previousRoundMatchIds and nextRoundMatchId
            }
        }
    }
}


export const createTournamentService = async (tournament: ITournament, league: any) => {
    try {
        tournament.league = { id: league._id, name: league.name };
        let newTournament = new Tournament(tournament);

        if (tournament.type === 'knockout') {
            if (tournament.teams.length % 2 !== 0) {
                throw new Error('Number of teams must be even');
            }
            const matchesByRound = await createMatches(tournament.teams, { id: newTournament._id, name: newTournament.name }, { id: league._id, name: league.name });

            const savedMatchesIds = await saveMatches(matchesByRound);

            await updateMatchLinks(savedMatchesIds);

            // Extract the IDs from savedMatchesIds array
            const matchIds = savedMatchesIds.flatMap(roundMatches => roundMatches.map(match => match._id));

            // Assign matchIds to newTournament.matches
            newTournament.matches = matchIds;

        }

        return await newTournament.save();

    } catch (error) {
        throw error;
    }
}

export const getTournamentsService = async () => {
    try {
        return await Tournament.find();
    } catch (error) {
        throw error;
    }
}

export const getTournamentById = async (id: string) => {
    try {
        return await Tournament
            .findById(id)
    }
    catch (error) {
        throw error;
    }
}
