import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import recipesData from "../assets/data/recipes.json";
import { FavoritesContext } from "../context/FavoritesContext";
import { LanguageContext } from "../context/LanguageContext";

function RecipeDetailsPage() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const { getLocalizedRecipe, t } = useContext(LanguageContext);

  const allRecipes = [
    ...recipesData.syrianRecipes,
    ...recipesData.turkishRecipes,
    ...recipesData.dessertRecipes,
    ...recipesData.appetizerRecipes,
  ];

  const recipe = allRecipes.find(
    (item) => String(item.id) === String(id)
  );

  if (!recipe) {
    return (
      <div className="recipe-not-found">
        <h2>{t.common?.notFoundTitle || "Recipe Not Found"}</h2>

        <p>
          {t.common?.notFoundText || "Sorry, we couldn't find this recipe."}
        </p>

        <Link to="/recipes" className="primary-btn">
          {t.common?.back || "Back to Recipes"}
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(recipe.id);
  const localizedRecipe = getLocalizedRecipe(recipe);

  const categoryName = t.categories?.[recipe.category] || recipe.category;
  const difficultyName = t.difficulties?.[recipe.difficulty] || recipe.difficulty;

  return (
    <div className="recipe-details-page">

      {/* Back Button */}
      <Link to="/recipes" className="back-link">
        <span className="back-arrow" aria-hidden="true">←</span>
        <span>{t.common?.back || "Back to Recipes"}</span>
      </Link>

      {/* =========================
          RECIPE HERO
      ========================= */}

      <section className="recipe-details-hero">

        {/* Image */}
        <div className="recipe-details-image">
          <img
            src={localizedRecipe.image || recipe.image}
            alt={localizedRecipe.title}
          />
        </div>

        {/* Information */}
        <div className="recipe-details-content">

          <span className="recipe-details-category">
            {categoryName}
          </span>

          <h1 dir="auto">{localizedRecipe.title}</h1>

          <button
            type="button"
            className={`recipe-details-favorite ${
              favorite ? "favorite-active" : ""
            }`}
            onClick={() => toggleFavorite(recipe)}
            aria-label={
              favorite
                ? t.common?.removeFavorite || "Remove from favorites"
                : t.common?.addFavorite || "Add to favorites"
            }
          >
            {favorite
              ? `❤️ ${t.common?.removeFavorite || "Remove from favorites"}`
              : `🤍 ${t.common?.addFavorite || "Add to favorites"}`}
          </button>

          {localizedRecipe.cuisine && (
            <p className="recipe-cuisine" dir="auto">
              🌍 {localizedRecipe.cuisine}
            </p>
          )}

          <p className="recipe-description" dir="auto">
            {localizedRecipe.description}
          </p>

          {/* Meta */}
          <div className="recipe-details-meta">

            <div className="meta-box">
              <span className="meta-icon" aria-hidden="true">
                ⏱️
              </span>

              <div>
                <small>{t.common?.time || "Cooking Time"}</small>
                <strong>{localizedRecipe.time}</strong>
              </div>
            </div>

            <div className="meta-box">
              <span className="meta-icon" aria-hidden="true">
                ⭐
              </span>

              <div>
                <small>{t.common?.difficulty || "Difficulty"}</small>
                <strong>{difficultyName}</strong>
              </div>
            </div>

            <div className="meta-box">
              <span className="meta-icon" aria-hidden="true">
                🍽️
              </span>

              <div>
                <small>{t.common?.servings || "Servings"}</small>
                <strong>{localizedRecipe.servings}</strong>
              </div>
            </div>

          </div>

        </div>

      </section>

      {localizedRecipe.didYouKnow && (
        <aside className="did-you-know-card">
          <span className="did-you-know-icon" aria-hidden="true">💡</span>
          <div>
            <h2>{t.common?.didYouKnow || "Did You Know?"}</h2>
            <p dir="auto">{localizedRecipe.didYouKnow}</p>
          </div>
        </aside>
      )}

      {/* =========================
          INGREDIENTS + STEPS
      ========================= */}

      <section className="recipe-content-grid">

        {/* Ingredients */}
        <div className="recipe-details-card">

          <div className="details-title">
            <span aria-hidden="true">🥗</span>
            <h2>{t.common?.ingredients || "Ingredients"}</h2>
          </div>

          {localizedRecipe.ingredients &&
          localizedRecipe.ingredients.length > 0 ? (

            <ul className="ingredients-list">

              {localizedRecipe.ingredients.map(
                (ingredient, index) => (
                  <li key={index}>

                    <span className="ingredient-check" aria-hidden="true">
                      ✓
                    </span>

                    <span dir="auto">
                      {ingredient}
                    </span>

                  </li>
                )
              )}

            </ul>

          ) : (

            <p className="missing-info">
              {t.common?.ingredientsUnavailable || "Ingredients are not available yet."}
            </p>

          )}

        </div>


        {/* Preparation */}
        <div className="recipe-details-card">

          <div className="details-title">
            <span aria-hidden="true">👨‍🍳</span>
            <h2>{t.common?.preparation || "Preparation"}</h2>
          </div>

          {localizedRecipe.steps &&
          localizedRecipe.steps.length > 0 ? (

            <div className="steps-list">

              {localizedRecipe.steps.map(
                (step, index) => (
                  <div
                    className="step-item"
                    key={index}
                  >

                    <div className="step-number" aria-hidden="true">
                      {index + 1}
                    </div>

                    <p dir="auto">{step}</p>

                  </div>
                )
              )}

            </div>

          ) : (

            <p className="missing-info">
              {t.common?.preparationUnavailable || "Preparation steps are not available yet."}
            </p>

          )}

        </div>

      </section>

    </div>
  );
}

export default RecipeDetailsPage;
