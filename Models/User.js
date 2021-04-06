import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    reruired: true,
    min: 6,
  },
  email: {
    type: String,
    reruired: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
