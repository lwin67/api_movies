const express = require("express");
const cors = require("cors");
require("dotenv").config();

const moviesRoutes = require("./routes/movies");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Movies API running" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3333;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;