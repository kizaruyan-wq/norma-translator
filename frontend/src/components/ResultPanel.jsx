import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function CopyBtn({ text }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <button className="btn-copy" onClick={copy}>
      {copied ? `✅ ${t("copied")}` : `📋 ${t("copyBtn")}`}
    </button>
  );
}

export default function ResultPanel({ result, onReset }) {
  const { t } = useTranslation();
  if (!result) return null;

  return (
    <div className="result-section" aria-live="polite">
      <div className="result-meta">
        <span className="lang-badge">{result.language?.toUpperCase()}</span>
        <span className="result-date">
          {new Date(result.createdAt).toLocaleString()}
        </span>
        <button className="btn-outline" onClick={onReset}>
          ← {t("newTranslation")}
        </button>
      </div>

      <div className="result-grid">
        {/* Original */}
        <div className="result-card original">
          <div className="card-header">
            <h2>{t("originalTitle")}</h2>
            <CopyBtn text={result.originalText} />
          </div>
          <p className="card-text">{result.originalText}</p>
        </div>

        {/* Simplified */}
        <div className="result-card simplified">
          <div className="card-header">
            <h2>{t("simplifiedTitle")}</h2>
            <CopyBtn text={result.simplifiedText} />
          </div>
          <p className="card-text">{result.simplifiedText}</p>
        </div>
      </div>
    </div>
  );
}