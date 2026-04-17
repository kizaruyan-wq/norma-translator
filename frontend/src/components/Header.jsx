import React from "react";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "ru", label: "RU" },
  { code: "kk", label: "ҚАЗ" },
  { code: "en", label: "EN" },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  return (
    <header className="header">
      <div className="header-logo">
        <span className="logo-icon">⚖️</span>
        <span className="logo-text">{t("appName")}</span>
      </div>
      <div className="lang-switcher">
        {LANGS.map((l) => (
          <button
            key={l.code}
            className={`lang-btn ${i18n.language === l.code ? "active" : ""}`}
            onClick={() => i18n.changeLanguage(l.code)}
          >
            {l.label}
          </button>
        ))}
      </div>
    </header>
  );
}