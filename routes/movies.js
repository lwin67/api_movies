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

module.exports = router;