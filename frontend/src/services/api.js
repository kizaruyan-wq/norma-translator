import axios from "axios";

const API_BASE_URL = "https://norma-translator-ob0c.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

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