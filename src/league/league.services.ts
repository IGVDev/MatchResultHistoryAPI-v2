import League from './league.model';

interface LeagueData {
    name: string;
    players: string[];
    tournaments?: string[];
    editors: string[];
}

export const createLeagueService = async (data: LeagueData, userEmail: string): Promise<any> => {
    try {
        data.editors = [userEmail];
        const league = new League(data);
        return await league.save();
    } catch (error) {
        throw error;
    }
}

export const getLeaguesService = async (): Promise<any> => {
    try {
        return await League.find();
    } catch (error) {
        throw error;
    }
}

export const getLeagueService = async (id: string): Promise<any> => {
    try {
        return await League.findById(id);
    } catch (error) {
        throw error;
    }
}

export const getLeaguesByUserService = async (userEmail: string): Promise<any> => {
    try {
        return await League.find({});
    } catch (error) {
        throw error;
    }
}

export const updateLeagueService = async (id, data: LeagueData, userEmail: string): Promise<any> => {
    try {
        const league = await League.findById(id);

        if (league.editors.includes(userEmail)) {
            return await League.findByIdAndUpdate(id, data, { new: true });
        }
        throw new Error('Unauthorized');

    } catch (error) {
        throw error;
    }
}

export const deleteLeagueService = async (id: string, userEmail: string): Promise<any> => {
    try {
        const league = await League.findById(id);

        if (league.editors.includes(userEmail)) {
            return await League.findByIdAndDelete(id);
        }
        throw new Error('Unauthorized');
    } catch (error) {
        throw error;
    }
}

