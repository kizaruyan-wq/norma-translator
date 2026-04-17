const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { simplifyText } = require("../services/aiService");
const history = require("../services/historyStore");

// POST /api/translate
router.post("/", async (req, res) => {
  const { text, language } = req.body;

  if (!text || typeof text !== "string" || text.trim().length < 20) {
    return res.status(400).json({ error: "Please provide at least 20 characters of text." });
  }

  if (text.length > 10000) {
    return res.status(400).json({ error: "Text exceeds the 10,000 character limit." });
  }

  try {
    const { simplifiedText, language: detectedLang } = await simplifyText(
      text,
      language || null
    );

    const entry = {
      id: uuidv4(),
      originalText: text.trim(),
      simplifiedText,
      language: detectedLang,
      createdAt: new Date().toISOString(),
    };

    history.save(entry);

    return res.status(200).json(entry);
  } catch (err) {
    console.error("Translation error:", err.message);
    return res.status(500).json({ error: "Failed to simplify text. Please try again." });
  }
});

module.exports = router;