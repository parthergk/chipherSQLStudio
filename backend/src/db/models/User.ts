import bcryptjs from "bcryptjs";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
username: { type: String, required: true, unique: true },
password: {type: String, required: true}
},{ timestamps: true });

userSchema.pre("save", async function () {
  if (this.isModified("password") && this.password) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
});

export const User = model("User", userSchema);