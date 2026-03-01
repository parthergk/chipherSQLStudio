import { Router, type Request, type Response } from "express";
import { Assignment } from "../db/models/Assignment.js";
import { pg } from "../db/pg.js";
import userMiddleware from "../middleware/userMiddleware.js";
import { UserProgress } from "../db/models/UserProgress.js";

const queryRoute: Router = Router();

queryRoute.post("/", userMiddleware, async (req: Request, res: Response) => {
  const client = await pg.connect();
  try {
    const { assId, query } = req.body;
    const userId = req.user.id;

    const assignment = await Assignment.findById(assId);

    if (!assignment) {
      return res.status(404).json({ error: "No assignment found" });
    }

    const schema = `sandbox_${Date.now()}`;

    await client.query("BEGIN");

    await client.query(`CREATE SCHEMA ${schema}`);

    await client.query(`SET search_path TO ${schema}`);

    for (const table of assignment.sampleTables) {
      const columns = table.columns
        .map((col) => `${col.columnName} ${col.dataType}`)
        .join(",");

      await client.query(`CREATE TABLE ${table.tableName} (${columns})`);

      for (const rowMap of table.rows) {
        const row = Object.fromEntries(rowMap);
        const keys = Object.keys(row);
        const values = Object.values(row);

        const columns = keys.join(",");
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");

        await client.query(
          `INSERT INTO ${table.tableName} (${columns}) VALUES (${placeholders})`,
          values,
        );
      }
    }
    if (!query.toLowerCase().startsWith("select")) {
      return res.status(400).json({ error: "Only SELECT queries allowed" });
    }
    const result = await client.query(query);

    const isCompleted = true; //compare result with assignment expected out put

    const existUserProgress = await UserProgress.findOne({
      userId,
      assignmentId: assId,
    });

    let userProgress;

    if (!existUserProgress) {
      userProgress = await UserProgress.create({
        userId,
        assignmentId: assId,
        sqlQuery: query,
        lastAttempt: new Date(),
        isCompleted,
        attemptCount: 1,
      });
    } else {
      existUserProgress.sqlQuery = query;
      existUserProgress.lastAttempt = new Date();
      existUserProgress.isCompleted = isCompleted;
      existUserProgress.attemptCount += 1;

      userProgress = await existUserProgress.save();
    }

    res
      .status(200)
      .json({
        rows: result.rows,
        isCompleted,
        attemptCount: existUserProgress?.attemptCount,
      });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Error: Query not exicuted" });
  } finally {
    await client.query("ROLLBACK");
    client.release();
  }
});

export default queryRoute;
