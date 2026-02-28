import dotenv from "dotenv";
dotenv.config();
import connectTodb from "../db/connection.js";
import { Assignment } from "../db/models/Assignment.js";
import { assignments } from "../seed/Assignment.js";

async function createAssignments() {
  try {
    await connectTodb();
    await Assignment.insertMany(assignments);
    console.log("Assignments inserted");
  } catch (error) {
    console.log("Error: ", error);
  }
}

createAssignments();
