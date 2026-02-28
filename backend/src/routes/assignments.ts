import { Router, type Request, type Response } from "express";
import { Assignment } from "../db/models/Assignment.js";
import userMiddleware from "../middleware/userMiddleware.js";

const assignmentRouter: Router = Router();

assignmentRouter.get("/",userMiddleware, async (req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find();

    if (!assignments.length) {
      return res.status(404).json({ error: "No assignments found" });
    }
    
    return res
      .status(200)
      .json({ message: "All assignments fetched", data: assignments });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Error: Assignments not fetched" });
  }
});

export default assignmentRouter;
