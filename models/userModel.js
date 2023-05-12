const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  twitter_id: Number,
  name: String,
  screen_name: String,
  description: String,
  url: String,
});

module.exports = mongoose.model("User", userSchema);
