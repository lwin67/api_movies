const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET all movies */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM movies");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

/* LIKE movie */
router.post("/:id/like", async (req, res) => {
  try {
    await db.query(
      "UPDATE movies SET likes = likes + 1 WHERE id=?",
      [req.params.id]
    );

    res.json({ message: "liked" });
  } catch (err) {
    res.status(500).json({ error: "Failed to like movie" });
  }
});

/* GET comments */
router.get("/:id/comments", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM comments WHERE movie_id = ? ORDER BY created_at DESC",
      [req.params.id]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

/* ADD comment */
router.post("/:id/comments", async (req, res) => {
  try {
    const { comment, rating } = req.body;

    if (!comment || !rating) {
      return res.status(400).json({ error: "Missing comment or rating" });
    }

    // 1️⃣ Insert comment
    const [result] = await db.query(
      "INSERT INTO comments (movie_id, comment, rating) VALUES (?, ?, ?)",
      [req.params.id, comment, rating]
    );

    // 2️⃣ Update movie average rating
    await db.query(
      `UPDATE movies 
       SET rating = (
         SELECT AVG(rating) FROM comments WHERE movie_id = ?
       )
       WHERE id = ?`,
      [req.params.id, req.params.id]
    );

    res.status(201).json({
      message: "Comment added",
      id: result.insertId,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

module.exports = router;