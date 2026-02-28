import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      res.status(401).json({ error: "invalid token" });
      return;
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET!);

    if (!verify) {
      res.status(401).json({ error: "invalid token" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "server side error" });
  }
};

export default userMiddleware;
