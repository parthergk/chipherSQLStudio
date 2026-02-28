import mongoose, { model, Schema } from "mongoose";

const userProgressSchema  = new Schema({
  userId: { type: String }, // Or sessionId for storing the non-auth user
  assignmentId: { type: mongoose.Schema.ObjectId, ref: "Assignment",required: true },
  sqlQuery: { type: String },
  lastAttempt: { type: Date },
  isCompleted: { type: Boolean, default: false },
  attemptCount: { type: Number, default: 0 },
},{ timestamps: true });

export const UserProgress = model("UserProgress", userProgressSchema );