const express = require("express");
const app = express();
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/js_articles", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const Article = require("./models/Article"); // Create the Article model

app.get("/api/items", async (req, res) => {
  try {
    const articles = await Articles.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});