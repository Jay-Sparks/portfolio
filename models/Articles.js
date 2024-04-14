const mongoose = require("mongoose");

const articleScheme = new mongoose.Schema({
  title: String,
  body: String,
  img_url: String,
});

module.exports = mongoose.model("Item", itemSchema);