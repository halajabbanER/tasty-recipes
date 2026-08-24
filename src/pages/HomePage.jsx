import { useContext } from "react";
import { Link } from "react-router-dom";

import RecipeCard from "../components/RecipeCard";
import recipesData from "../assets/data/recipes.json";
import { LanguageContext } from "../context/LanguageContext";

function HomePage() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="home-page">

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-badge">
            🍴 {t.home.badge}
          </span>

          <h1>
            {t.home.title1}
            <span> {t.home.title2}</span>
          </h1>

          <p>
            {t.home.description}
          </p>

          <div className="hero-buttons">

            <Link
              to="/recipes"
              className="primary-btn"
            >
              {t.home.explore}
            </Link>

            <Link
              to="/favorites"
              className="secondary-btn"
            >
              ❤️ {t.home.favorites}
            </Link>

          </div>

        </div>


        {/* HERO IMAGE */}

        <div className="hero-image-container">

          <img
            src="/images/home.jpg"
            alt="Delicious food"
            className="hero-image"
          />

        </div>

      </section>


      {/* ================= SYRIAN RECIPES ================= */}

      <section className="recipe-section">

        <div className="section-header">

          <div>
            <span className="section-small-title">
              🇸🇾 {t.home.syrianSmall}
            </span>

            <h2>
              {t.home.syrian}
            </h2>
          </div>

          <Link
            to="/recipes?cuisine=syrian"
            className="view-all-link"
          >
            <span>{t.home.viewAll}</span>
            <span className="arrow-icon" aria-hidden="true">→</span>
          </Link>

        </div>


        <div className="recipes-grid">

          {recipesData.syrianRecipes
            .slice(0, 3)
            .map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
              />
            ))}

        </div>

      </section>


      {/* ================= TURKISH RECIPES ================= */}

      <section className="recipe-section">

        <div className="section-header">

          <div>
            <span className="section-small-title">
              🇹🇷 {t.home.turkishSmall}
            </span>

            <h2>
              {t.home.turkish}
            </h2>
          </div>

          <Link
            to="/recipes?cuisine=turkish"
            className="view-all-link"
          >
            <span>{t.home.viewAll}</span>
            <span className="arrow-icon" aria-hidden="true">→</span>
          </Link>

        </div>


        <div className="recipes-grid">

          {recipesData.turkishRecipes
            .slice(0, 3)
            .map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
              />
            ))}

        </div>

      </section>


      {/* ================= DESSERTS ================= */}

      <section className="recipe-section dessert-section">

        <div className="section-header">

          <div>
            <span className="section-small-title">
              🍰 {t.home.dessertSmall}
            </span>

            <h2>
              {t.home.desserts}
            </h2>
          </div>

          <Link
            to="/recipes?category=dessert"
            className="view-all-link"
          >
            <span>{t.home.viewAll}</span>
            <span className="arrow-icon" aria-hidden="true">→</span>
          </Link>

        </div>


        <div className="recipes-grid">

          {recipesData.dessertRecipes
            .slice(0, 3)
            .map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
              />
            ))}

        </div>

      </section>


      {/* ================= APPETIZERS ================= */}

      <section className="recipe-section">

        <div className="section-header">

          <div>
            <span className="section-small-title">
              🥗 {t.home.appetizerSmall}
            </span>

            <h2>
              {t.home.appetizers}
            </h2>
          </div>

          <Link
            to="/recipes?category=appetizer"
            className="view-all-link"
          >
            <span>{t.home.viewAll}</span>
            <span className="arrow-icon" aria-hidden="true">→</span>
          </Link>

        </div>


        <div className="recipes-grid">

          {recipesData.appetizerRecipes
            .slice(0, 3)
            .map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
              />
            ))}

        </div>

      </section>

    </div>
  );
}

export default HomePage;
