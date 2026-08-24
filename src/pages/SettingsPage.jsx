import { useContext, useEffect, useState } from "react";

import { LanguageContext } from "../context/LanguageContext";
import { ThemeContext } from "../context/ThemeContext";
import { FavoritesContext } from "../context/FavoritesContext";

function SettingsPage() {
  const { language, setLanguage, t } = useContext(LanguageContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { favorites } = useContext(FavoritesContext);

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");

    return saved
      ? JSON.parse(saved)
      : {
          newRecipes: true,
          recommendations: true,
        };
  });

  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem("recipePreferences");

    return saved
      ? JSON.parse(saved)
      : {
          syrian: true,
          turkish: true,
          desserts: true,
          appetizers: true,
        };
  });

  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      "recipePreferences",
      JSON.stringify(preferences)
    );
  }, [preferences]);

  const handlePreferenceChange = (name) => {
    setPreferences((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const resetSettings = () => {
    setLanguage("en");

    if (theme === "dark") {
      toggleTheme();
    }

    setNotifications({
      newRecipes: true,
      recommendations: true,
    });

    setPreferences({
      syrian: true,
      turkish: true,
      desserts: true,
      appetizers: true,
    });

    localStorage.removeItem("notifications");
    localStorage.removeItem("recipePreferences");
  };

  return (
    <div className="settings-page">

      <div className="settings-header">
        <span className="section-small-title">
          ⚙️ {t.settings?.badge || "Personalize"}
        </span>

        <h1>{t.settings?.title || "Settings"}</h1>

        <p>
          {t.settings?.subtitle || "Customize your Tasty Recipes experience."}
        </p>
      </div>

      <div className="settings-grid">

        {/* LANGUAGE */}
        <div className="settings-card">
          <div className="settings-card-title">
            <span aria-hidden="true">🌐</span>

            <div>
              <h3>{t.settings?.language || "Language"}</h3>
              <p>{t.settings?.languageDesc || "Choose your preferred language."}</p>
            </div>
          </div>

          <select
            className="form-select settings-select"
            value={language}
            aria-label={t.settings?.language || "Language"}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">
              🇬🇧 English
            </option>

            <option value="tr">
              🇹🇷 Türkçe
            </option>

            <option value="ar">
              🇸🇾 العربية
            </option>
          </select>
        </div>

        {/* APPEARANCE */}
        <div className="settings-card">
          <div className="settings-card-title">
            <span aria-hidden="true">🎨</span>

            <div>
              <h3>{t.settings?.appearance || "Appearance"}</h3>
              <p>{t.settings?.appearanceDesc || "Change the website theme."}</p>
            </div>
          </div>

          <div className="theme-options" role="group" aria-label={t.settings?.appearance || "Appearance"}>
            <button
              type="button"
              className={
                theme === "light"
                  ? "theme-option active-setting"
                  : "theme-option"
              }
              onClick={() => {
                if (theme !== "light") {
                  toggleTheme();
                }
              }}
            >
              ☀️ {t.settings?.themeLight || "Light"}
            </button>

            <button
              type="button"
              className={
                theme === "dark"
                  ? "theme-option active-setting"
                  : "theme-option"
              }
              onClick={() => {
                if (theme !== "dark") {
                  toggleTheme();
                }
              }}
            >
              🌙 {t.settings?.themeDark || "Dark"}
            </button>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="settings-card">
          <div className="settings-card-title">
            <span aria-hidden="true">🔔</span>

            <div>
              <h3>{t.settings?.notifications || "Notifications"}</h3>
              <p>{t.settings?.notificationsDesc || "Manage your recipe notifications."}</p>
            </div>
          </div>

          <div className="setting-switch-row">
            <div>
              <strong>{t.settings?.newRecipes || "New Recipes"}</strong>
              <p>{t.settings?.newRecipesDesc || "Receive updates for new recipes."}</p>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                aria-label={t.settings?.newRecipes || "New Recipes"}
                checked={notifications.newRecipes}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    newRecipes: !prev.newRecipes,
                  }))
                }
              />
            </div>
          </div>

          <div className="setting-switch-row">
            <div>
              <strong>{t.settings?.recommendations || "Recommendations"}</strong>
              <p>{t.settings?.recommendationsDesc || "Receive recipe recommendations."}</p>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                aria-label={t.settings?.recommendations || "Recommendations"}
                checked={notifications.recommendations}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    recommendations:
                      !prev.recommendations,
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* RECIPE PREFERENCES */}
        <div className="settings-card">
          <div className="settings-card-title">
            <span aria-hidden="true">🍽️</span>

            <div>
              <h3>{t.settings?.recipePreferences || "Recipe Preferences"}</h3>
              <p>{t.settings?.recipePreferencesDesc || "Select the recipes you are interested in."}</p>
            </div>
          </div>

          <div className="preference-list">
            <label>
              <input
                type="checkbox"
                checked={preferences.syrian}
                onChange={() =>
                  handlePreferenceChange("syrian")
                }
              />
              <span>🇸🇾 {t.settings?.prefSyrian || "Syrian Recipes"}</span>
            </label>

            <label>
              <input
                type="checkbox"
                checked={preferences.turkish}
                onChange={() =>
                  handlePreferenceChange("turkish")
                }
              />
              <span>🇹🇷 {t.settings?.prefTurkish || "Turkish Recipes"}</span>
            </label>

            <label>
              <input
                type="checkbox"
                checked={preferences.desserts}
                onChange={() =>
                  handlePreferenceChange("desserts")
                }
              />
              <span>🍰 {t.settings?.prefDesserts || "Desserts"}</span>
            </label>

            <label>
              <input
                type="checkbox"
                checked={preferences.appetizers}
                onChange={() =>
                  handlePreferenceChange("appetizers")
                }
              />
              <span>🥗 {t.settings?.prefAppetizers || "Appetizers"}</span>
            </label>
          </div>
        </div>

        {/* FAVORITES INFO */}
        <div className="settings-card">
          <div className="settings-card-title">
            <span aria-hidden="true">❤️</span>

            <div>
              <h3>{t.settings?.favoritesTitle || "Favorites"}</h3>
              <p>{t.settings?.favoritesDesc || "Your saved recipe information."}</p>
            </div>
          </div>

          <div className="favorites-setting-count">
            <strong>{favorites.length}</strong>
            <span>
              {favorites.length === 1
                ? t.settings?.favoritesCountSingular || t.settings?.favoritesCount || "saved recipe"
                : t.settings?.favoritesCount || "saved recipes"}
            </span>
          </div>
        </div>

        {/* RESET */}
        <div className="settings-card reset-card">
          <div className="settings-card-title">
            <span aria-hidden="true">🔄</span>

            <div>
              <h3>{t.settings?.resetTitle || "Reset Settings"}</h3>
              <p>{t.settings?.resetDesc || "Restore the default settings."}</p>
            </div>
          </div>

          <button
            type="button"
            className="reset-settings-btn"
            onClick={resetSettings}
          >
            {t.settings?.resetBtn || "Reset Settings"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default SettingsPage;