import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import "./App.css";

import Header from "./components/Header";
import TranslateForm from "./components/TranslateForm";
import ResultPanel from "./components/ResultPanel";
import HistoryPanel from "./components/HistoryPanel";
import { translateText } from "./services/api";

export default function App() {
  const { t } = useTranslation();

  // Form state
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // Trigger history refresh after each translation
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSimplify = async () => {
    // Validation
    if (!text.trim()) return setError(t("errorEmpty"));
    if (text.trim().length < 20) return setError(t("errorTooShort"));
    if (text.length > 10000) return setError(t("errorTooLong"));

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const data = await translateText(text, language || null);
      setResult(data);
      setRefreshKey((k) => k + 1); // refresh history
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.error || t("errorServer"));
      } else {
        setError(t("errorNetwork"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText("");
    setResult(null);
    setError("");
  };

  return (
    <div className="app">
      <Header />

      <main className="main">
        {/* Hero */}
        <div className="hero">
          <h1 className="hero-title">{t("appName")}</h1>
          <p className="hero-tagline">{t("tagline")}</p>
        </div>

        {/* Two-column layout: form/results + history */}
        <div className="layout">
          <div className="layout-main">
            {!result ? (
              <TranslateForm
                text={text}
                setText={setText}
                language={language}
                setLanguage={setLanguage}
                loading={loading}
                error={error}
                onSubmit={handleSimplify}
              />
            ) : (
              <ResultPanel result={result} onReset={handleReset} />
            )}
          </div>

          <div className="layout-side">
            <HistoryPanel refreshKey={refreshKey} />
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>{t("footerText")}</p>
      </footer>
    </div>
  );
}