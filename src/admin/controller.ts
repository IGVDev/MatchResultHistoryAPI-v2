import { Request, Response } from "express";
import * as AdminServices from "./services";

export const adminLogin = async (req: Request, res: Response) => {
  const login = await AdminServices.adminLoginService(req, res);
  res.json(login);
};