const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET all */
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM movies");
  res.json(rows);
});

/* LIKE */
router.post("/:id/like", async (req, res) => {
  const [result] = await db.query(
    "UPDATE movies SET likes = likes + 1 WHERE id=?",
    [req.params.id]
  );

  res.json({ message: "liked" });
});

/* GET comments */
router.get("/:id/comments", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM comments WHERE movie_id = ? ORDER BY created_at DESC",
    [req.params.id]
  );

  res.json(rows);
});

/* ADD comment */
router.post("/:id/comments", async (req, res) => {
  const { comment, rating } = req.body;

  const [result] = await db.query(
    "INSERT INTO comments (movie_id, comment, rating) VALUES (?, ?, ?)",
    [req.params.id, comment, rating]

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
});

module.exports = router;