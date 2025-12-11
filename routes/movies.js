const express = require("express");
const Movie = require("../models/Movie");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// CREATE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const movie = await Movie.create({
      ...req.body,
      userId: req.user.id
    });
    res.json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ (User movies)
router.get("/", authMiddleware, async (req, res) => {
  const movies = await Movie.find({ userId: req.user.id });
  res.json(movies);
});

// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    res.json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
