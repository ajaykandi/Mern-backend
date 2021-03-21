import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    reruired: true,
  },
  email: {
    type: String,
    reruired: true,
  },
  age: {
    type: Number,
  },
});

export default mongoose.model("User", userSchema);
