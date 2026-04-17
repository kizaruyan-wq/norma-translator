const express = require("express");
const router = express.Router();
const history = require("../services/historyStore");

// GET /api/history
router.get("/", (req, res) => {
  res.json({ translations: history.getAll() });
});

// DELETE /api/history/:id
router.delete("/:id", (req, res) => {
  history.remove(req.params.id);
  res.json({ success: true });
});

module.exports = router;