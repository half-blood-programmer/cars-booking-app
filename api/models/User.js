import mongoose from "mongoose";
const { Schema } = mongoose;

// create table User
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email_verifiedAt: { type: String, default: null, min: 8 },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
