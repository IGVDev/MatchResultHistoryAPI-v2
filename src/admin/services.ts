import { Request, Response } from "express";
const bcrypt = require("bcryptjs");

export const adminLoginService = (req: Request, res: Response) => {
  try {
    let { hash } = req.body;
    if (bcrypt.compareSync(process.env.ADMIN_PASSWORD, hash)) {
      res.status(200);
      return "SUCCESS";
    } else {
      res.status(403);
      return "DENIED";
    }
  } catch (error) {
    res.status(503).send("Internal Server Error");
  }
};
