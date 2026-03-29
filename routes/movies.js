const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET all movies */
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM movies");
  res.json(rows);
});

/* GET movie by ID */
router.get("/:id", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM movies WHERE id=?", [req.params.id]);

  if (rows.length === 0) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(rows[0]);
});

/* CREATE movie */
router.post("/", async (req, res) => {
  const { title, description, poster_url, rating } = req.body;

  const [result] = await db.query(
    "INSERT INTO movies (title, description, poster_url, rating, likes) VALUES (?, ?, ?, ?, 0)",
    [title, description, poster_url, rating]
  );

  res.status(201).json({ id: result.insertId });
});

/* UPDATE movie */
router.put("/:id", async (req, res) => {
  const { title, description, poster_url, rating, likes } = req.body;

  const [result] = await db.query(
    "UPDATE movies SET title=?, description=?, poster_url=?, rating=?, likes=? WHERE id=?",
    [title, description, poster_url, rating, likes, req.params.id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json({ message: "Updated" });
});

/* DELETE movie */
router.delete("/:id", async (req, res) => {
  const [result] = await db.query(
    "DELETE FROM movies WHERE id=?",
    [req.params.id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json({ message: "Deleted" });
});

/* LIKE movie */
router.post("/:id/like", async (req, res) => {
  const [result] = await db.query(
    "UPDATE movies SET likes = likes + 1 WHERE id=?",
    [req.params.id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json({ message: "Liked" });
});

module.exports = router;