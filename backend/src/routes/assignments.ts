import { Router, type Request, type Response } from "express";
import { Assignment } from "../db/models/Assignment.js";

const assignmentRouter: Router = Router();

assignmentRouter.get("/", async (req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find();

    if (!assignments.length) {
      return res.status(404).json({ message: "No assignments found" });
    }
    
    return res
      .status(200)
      .json({ message: "All assignments fetched", data: assignments });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Error: Assignments not fetched" });
  }
});

export default assignmentRouter;
