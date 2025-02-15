import mongoose from "mongoose";
const Schema = mongoose.Schema;
 
const usersSchema = new Schema({
  name: String,
  pseudo: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("users", usersSchema);