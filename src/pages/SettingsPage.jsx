import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { ThemeContext } from "../context/ThemeContext";

function SettingsPage() {
  const { language, setLanguage, languages, t } = useContext(LanguageContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="settings-page">

      <div className="settings-header">
        <span className="section-small-title">
          ⚙️ {t.navbar?.settings || "Settings"}
        </span>
        <h1>{t.settings?.title || "Settings"}</h1>
        <p>
          {t.settings?.subtitle ||
            "Personalize your cooking experience and preferences."}
        </p>
      </div>

      <div className="settings-cards-grid">

        {/* ================= LANGUAGE SECTION ================= */}
        <section className="settings-card">
          <div className="settings-card-header">
            <span className="settings-card-icon" aria-hidden="true">🌐</span>
            <div>
              <h2>{t.settings?.language || "Language"}</h2>
              <p>{t.settings?.languageDesc || "Choose your preferred interface and recipe language."}</p>
            </div>
          </div>

          <div className="language-options-grid" role="radiogroup" aria-label={t.settings?.language || "Language"}>
            {languages.map((item) => {
              const isSelected = item.code === language;
              return (
                <button
                  key={item.code}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`language-choice-card ${isSelected ? "selected" : ""}`}
                  onClick={() => setLanguage(item.code)}
                >
                  <div className="choice-flag">{item.flag}</div>
                  <div className="choice-info">
                    <strong className="choice-native">{item.nativeName}</strong>
                    <span className="choice-name">{item.name}</span>
                  </div>
                  <div className="choice-radio-indicator">
                    {isSelected && <span className="radio-dot"></span>}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ================= THEME SECTION ================= */}
        <section className="settings-card">
          <div className="settings-card-header">
            <span className="settings-card-icon" aria-hidden="true">🎨</span>
            <div>
              <h2>{t.settings?.appearance || "Appearance"}</h2>
              <p>{t.settings?.appearanceDesc || "Switch between light and dark themes."}</p>
            </div>
          </div>

          <div className="theme-options-grid" role="radiogroup" aria-label={t.settings?.appearance || "Appearance"}>
            <button
              type="button"
              role="radio"
              aria-checked={theme === "light"}
              className={`theme-choice-card ${theme === "light" ? "selected" : ""}`}
              onClick={() => {
                if (theme !== "light") toggleTheme();
              }}
            >
              <span className="theme-icon" aria-hidden="true">☀️</span>
              <div className="choice-info">
                <strong>{t.settings?.themeLight || "Light Mode"}</strong>
              </div>
              <div className="choice-radio-indicator">
                {theme === "light" && <span className="radio-dot"></span>}
              </div>
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={theme === "dark"}
              className={`theme-choice-card ${theme === "dark" ? "selected" : ""}`}
              onClick={() => {
                if (theme !== "dark") toggleTheme();
              }}
            >
              <span className="theme-icon" aria-hidden="true">🌙</span>
              <div className="choice-info">
                <strong>{t.settings?.themeDark || "Dark Mode"}</strong>
              </div>
              <div className="choice-radio-indicator">
                {theme === "dark" && <span className="radio-dot"></span>}
              </div>
            </button>
          </div>
        </section>

        {/* ================= ABOUT SECTION ================= */}
        <section className="settings-card about-card">
          <div className="settings-card-header">
            <span className="settings-card-icon" aria-hidden="true">ℹ️</span>
            <div>
              <h2>{t.settings?.about || "About Tasty Recipes"}</h2>
              <p>{t.settings?.aboutDesc || "A curated collection of authentic Syrian and Turkish recipes."}</p>
            </div>
          </div>

          <div className="settings-about-footer">
            <span className="badge-version">{t.settings?.version || "Version 1.0.0"}</span>
            <span className="about-made-with">❤️ Syrian & Turkish Cuisine</span>
          </div>
        </section>

      </div>

    </div>
  );
}

export default SettingsPage;