import mongoose from "mongoose";

const ChoreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Chore = mongoose.model("Chore", ChoreSchema);

export default Chore;
