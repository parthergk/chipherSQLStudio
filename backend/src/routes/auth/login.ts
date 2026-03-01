import { Router } from "express";
import { User } from "../../db/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginRoute: Router = Router();

loginRoute.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        error: "Username and password are required",
      });
      return;
    }

    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({
        error: "Invalid credentials",
      });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({
        error: "Invalid credentials",
      });
      return;
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default loginRoute;