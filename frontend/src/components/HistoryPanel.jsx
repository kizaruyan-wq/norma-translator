import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchHistory, deleteEntry } from "../services/api";

export default function HistoryPanel({ refreshKey }) {
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchHistory()
      .then(setHistory)
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const handleDelete = async (id) => {
    await deleteEntry(id);
    setHistory((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <aside className="history-panel">
      <h2 className="history-title">🕒 {t("historyTitle")}</h2>

      {loading && <p className="history-loading">{t("historyLoading")}</p>}

      {!loading && history.length === 0 && (
        <p className="history-empty">{t("historyEmpty")}</p>
      )}

      <ul className="history-list">
        {history.map((entry) => (
          <li key={entry.id} className="history-item">
            <div className="history-item-text">
              <span className="history-lang">{entry.language?.toUpperCase()}</span>
              <span className="history-preview">
                {entry.originalText.slice(0, 80)}
                {entry.originalText.length > 80 ? "…" : ""}
              </span>
              <span className="history-date">
                {new Date(entry.createdAt).toLocaleDateString()}
              </span>
            </div>
            <button
              className="btn-delete"
              onClick={() => handleDelete(entry.id)}
              aria-label={t("historyDelete")}
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}