import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },

  email: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },

  password: {
    type: String,
    required: true,
    min: 4,
    max: 1024,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
