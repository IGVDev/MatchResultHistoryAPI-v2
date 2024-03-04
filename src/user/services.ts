
import User from "./model";
import bcrypt from "bcryptjs";

type User = {
  email: string;
  password: string;
};

export const createUserService = async (body: User) => {
  try {
    body.password = await bcrypt.hash(body.password, 10);
    const newUser = new User(body).save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const getUsersService = async (): Promise<string[]> => {
  try {
    return await User.find().lean();
  } catch (error) {
    throw error;
  }
};

export const getUserByIdService = async (id: string) => {
  try {
    return await User.findById(id).lean();
  } catch (error) {
    throw error;
  }
};

export const updateUserService = async (id: string, body: Object) => {
  try {
    const user = await User.findByIdAndUpdate(id, body);
    if (!user) return "User not found";
    return "User updated";
  } catch (error) {
    throw error;
  }
};

export const deleteUserService = async (id: string) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return "User not found";
    return "User deleted";
  } catch (error) {
    throw error;
  }
};

export const getUsersByLeagueService = async (league: string) => {
  try {
    return await User.find({ league }).lean();
  } catch (error) {
    return [];
  }
};
