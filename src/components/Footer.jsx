import { useContext } from "react";
import { Link } from "react-router-dom";

import { LanguageContext } from "../context/LanguageContext";

function Footer() {
  const { t } = useContext(LanguageContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h2>🍽️ {t.navbar.logo}</h2>

          <p>{t.footer.description}</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>{t.footer.quickLinks}</h3>

          <Link to="/">{t.navbar.home}</Link>
          <Link to="/recipes">{t.navbar.recipes}</Link>
          <Link to="/favorites">{t.navbar.favorites}</Link>
          <Link to="/about">{t.navbar.about}</Link>
          <Link to="/settings">{t.navbar.settings}</Link>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3>{t.footer.categories}</h3>

          <Link to="/recipes?cuisine=syrian">
            🧆 {t.recipes.syrianTitle}
          </Link>

          <Link to="/recipes?cuisine=turkish">
            🍢 {t.recipes.turkishTitle}
          </Link>

          <Link to="/recipes?category=dessert">
            🍰 {t.recipes.dessertsTitle}
          </Link>

          <Link to="/recipes?category=appetizer">
            🥗 {t.recipes.appetizersTitle}
          </Link>
        </div>

        {/* Info */}
        <div className="footer-section">
          <h3>{t.footer.explore}</h3>

          <p>🌐 {t.footer.languages}</p>
          <p>❤️ {t.footer.favoriteFeature}</p>
          <p>🌙 {t.footer.themeFeature}</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} {t.navbar.logo}. {t.footer.rights}
        </p>

        <span>
          {t.footer.designedBy} <strong>Hala Jabban</strong> ❤️
        </span>
      </div>
    </footer>
  );
}

export default Footer;
