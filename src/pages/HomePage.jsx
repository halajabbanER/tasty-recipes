import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import recipesData from "../assets/data/recipes.json";

function HomePage() {
  return (
    <div className="home-page">

      {/* ================= HERO ================= */}

      <section className="hero">
        <div className="hero-content">

          <span className="hero-badge">
            🍴 Easy & Delicious Recipes
          </span>

          <h1>
            Discover Your Next
            <span> Favorite Recipe</span>
          </h1>

          <p>
            Explore delicious recipes from Syrian and Turkish cuisine.
            Discover traditional dishes, delicious desserts and much more.
          </p>

          <div className="hero-buttons">
            <Link to="/recipes" className="primary-btn">
              Explore Recipes
            </Link>

            <Link to="/favorites" className="secondary-btn">
              ❤️ My Favorites
            </Link>
          </div>

        </div>

        <div className="hero-emoji">
          🍽️
        </div>
      </section>


      {/* ================= SYRIAN RECIPES ================= */}

      <section className="recipe-section">

        <div className="section-header">
          <div>
            <span className="section-small-title">
              Traditional Flavors
            </span>

            <h2>Syrian Recipes</h2>
          </div>

          <Link
            to="/recipes?cuisine=syrian"
            className="view-all-link"
          >
            View All →
          </Link>
        </div>

        <div className="recipes-grid">

          {recipesData.recipes
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
              Taste of Türkiye
            </span>

            <h2>Turkish Recipes</h2>
          </div>

          <Link
            to="/recipes?cuisine=turkish"
            className="view-all-link"
          >
            View All →
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
              🍰 Sweet Moments
            </span>

            <h2>Delicious Desserts</h2>
          </div>

          <Link
            to="/recipes?category=dessert"
            className="view-all-link"
          >
            View All →
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

    </div>
  );
}

export default HomePage;
