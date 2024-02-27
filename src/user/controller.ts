import { Request, Response } from "express";
import * as UserServices from "./services";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newUser = await UserServices.createUserService(req.body);
  res.status(201).json(newUser);
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await UserServices.getUsersService();
  res.json(users);
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = await UserServices.getUserByIdService(req.params.id);
  res.json(user);
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = await UserServices.updateUserService(req.params.id, req.body);
  res.json(user);
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = await UserServices.deleteUserService(req.params.id);
  res.json(user);
};

export const getUsersByLeague = async (
  req: Request,
  res: Response
): Promise<void> => {
  const users = await UserServices.getUsersByLeagueService(req.params.league);
  res.json(users);
};
