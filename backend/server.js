require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS (open for deployment)
app.use(cors());

// JSON
app.use(express.json());

// Routes
app.use("/api/translate", require("./routes/translate"));
app.use("/api/history", require("./routes/history"));

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// 404
app.use((req, res) => res.status(404).json({ error: "Not found" }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () =>
  console.log(`Backend running on ${PORT}`)
);