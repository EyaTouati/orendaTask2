const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  year:        { type: Number },
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Movie", movieSchema);
