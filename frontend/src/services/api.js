import axios from "axios";

// In dev, CRA proxy forwards /api/* → http://localhost:5000
const api = axios.create({ timeout: 30000 });

export async function translateText(text, language) {
  const res = await api.post("/api/translate", { text, language });
  return res.data;
}

export async function fetchHistory() {
  const res = await api.get("/api/history");
  return res.data.translations;
}

export async function deleteEntry(id) {
  await api.delete(`/api/history/${id}`);
}