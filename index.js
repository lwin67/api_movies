const express = require("express");
const cors = require("cors");
require("dotenv").config();

const movies = require("./routes/movies");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/movies", movies);

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(3333, () => {
    console.log("Server running");
  });
}

module.exports = app;