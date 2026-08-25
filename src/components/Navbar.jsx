import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { LanguageContext } from "../context/LanguageContext";
import { ThemeContext } from "../context/ThemeContext";
import LanguageSelector from "./LanguageSelector";

function Navbar() {
  const { t } = useContext(LanguageContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main Navigation">
        <Link to="/" className="logo" aria-label={t.navbar?.logo || "Tasty Recipes"}>
          <span className="logo-icon" aria-hidden="true">🍽️</span>
          <span className="logo-text">{t.navbar?.logo || "Tasty Recipes"}</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" end>
            {t.navbar?.home || "Home"}
          </NavLink>

          <NavLink to="/recipes">
            {t.navbar?.recipes || "Recipes"}
          </NavLink>

          <NavLink to="/favorites">
            {t.navbar?.favorites || "Favorites"}
          </NavLink>

          <NavLink to="/settings">
            {t.navbar?.settings || "Settings"}
          </NavLink>

          <NavLink to="/about">
            {t.navbar?.about || "About"}
          </NavLink>

          <div className="nav-actions">
            <button
              type="button"
              className="theme-btn"
              onClick={toggleTheme}
              aria-label={t.navbar?.toggleTheme || "Toggle Theme"}
              title={theme === "light" ? "Dark Mode" : "Light Mode"}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <LanguageSelector variant="dropdown" />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
