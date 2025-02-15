import mongoose from "mongoose";
const Schema = mongoose.Schema;
 
const gameSessionSchema = new Schema({
  pseudo: String,
  description: String,
  score: Number,
  level: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("gameSession", gameSessionSchema);