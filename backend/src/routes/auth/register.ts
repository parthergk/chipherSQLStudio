import { Router, type Request, type Response } from "express";
import { User } from "../../db/models/User.js";

const registerRoute: Router = Router();

registerRoute.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
    return;
  }

  try {
    const existUsername = await User.findOne({ username });

    if (existUsername) {
      res.status(400).json({
        success: false,
        message: "User already exist with this username",
      });
      return;
    }

    await User.create({ username, password });

    res.status(201).json({ message: "user register successful" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default registerRoute;
