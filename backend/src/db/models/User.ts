import bcryptjs from "bcryptjs";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {type: String, requied: true, unique: true},
    password: {type: String, required: true}
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next();
});

export const User = model("User", userSchema);