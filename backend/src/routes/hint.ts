import { Router, type Request, type Response } from "express";
import { Assignment } from "../db/models/Assignment.js";
import { GoogleGenAI } from "@google/genai";
import { buildHintPrompt } from "../prompts/hintPrompt.js";
import userMiddleware from "../middleware/userMiddleware.js";

const llmHintRoute: Router = Router();

const ai = new GoogleGenAI({});

llmHintRoute.post("/",userMiddleware, async(req: Request, res: Response) => {
  try {
    const { assigId } = req.body;

    const assignment = await Assignment.findById(assigId);
    
    if (!assignment) {
      return res.status(404).json({ error: "No assignment found" });
    }

    const prompt = buildHintPrompt(assignment);
    
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    })
    
    res.status(200).json({data:response.text})
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Error: Not getting hint" });
  }
});

export default llmHintRoute;
