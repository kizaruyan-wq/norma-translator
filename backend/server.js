require("dotenv").config();
console.log("KEY:", process.env.OPENAI_API_KEY);

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from React frontend
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
// Parse JSON request bodies
app.use(express.json());

// Routes
app.use("/api/translate", require("./routes/translate"));
app.use("/api/history", require("./routes/history"));

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// 404
app.use((req, res) => res.status(404).json({ error: "Not found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);