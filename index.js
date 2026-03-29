const express = require("express");
const cors = require("cors");
require("dotenv").config();

const movies = require("./routes/movies");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json()); // 🔥 VERY IMPORTANT for POST (comments)

/* Routes */
app.use("/movies", movies);

/* Root endpoint */
app.get("/", (req, res) => {
  res.json({ message: "Movies API running" });
});

/* 404 handler (nice for debugging) */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

/* Global error handler */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

/* Start server (only local) */
const PORT = process.env.PORT || 3333;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

/* Export for Vercel */
module.exports = app;