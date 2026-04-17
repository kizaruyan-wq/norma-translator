import React from "react";
import { useTranslation } from "react-i18next";

const MAX = 10000;

export default function TranslateForm({ text, setText, language, setLanguage, loading, error, onSubmit }) {
  const { t } = useTranslation();
  const over = text.length > MAX;

  return (
    <div className="form-card">
      <div className="form-row">
        <label className="form-label">{t("inputLabel")}</label>
        <select
          className="lang-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">{t("langAuto")}</option>
          <option value="ru">{t("langRu")}</option>
          <option value="kk">{t("langKk")}</option>
          <option value="en">{t("langEn")}</option>
        </select>
      </div>

      <textarea
        className={`textarea ${over ? "over-limit" : ""}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("inputPlaceholder")}
        rows={10}
        disabled={loading}
        onKeyDown={(e) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") onSubmit(); }}
      />

      <div className={`char-count ${over ? "over-limit" : ""}`}>
        {t("charCount", { count: text.length.toLocaleString() })}
      </div>

      {error && (
        <div className="error-banner" role="alert">
          ⚠️ {error}
        </div>
      )}

      <button
        className="btn-primary"
        onClick={onSubmit}
        disabled={loading || over}
      >
        {loading ? (
          <><span className="spinner" /> {t("simplifying")}</>
        ) : (
          <>✨ {t("simplifyBtn")}</>
        )}
      </button>
    </div>
  );
}