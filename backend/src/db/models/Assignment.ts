import mongoose, { model, Schema } from "mongoose";

const assignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
      required: true,
    },
    description: { type: String, required: true },
    sampleTables: [
      {
        tableName: { type: String, required: true },
        columns: [
          {
            columnName: { type: String, required: true },
            dataType: { type: String, required: true },
          },
        ],
        rows: [{ type: Map, of: mongoose.Schema.Types.Mixed }],
      },
    ],
    expectedOutput: {
      type: { type: String, required: true },
      value: [{ type: mongoose.Schema.Types.Mixed }],
    },
  },
  { timestamps: true },
);

export const Assignment = model("Assignment", assignmentSchema);
