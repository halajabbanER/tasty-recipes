import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import { LanguageContext } from "../context/LanguageContext";

function RecipeCard({ recipe }) {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const { getLocalizedRecipe, t } = useContext(LanguageContext);

  const localizedRecipe = getLocalizedRecipe(recipe);
  const favorite = isFavorite(recipe.id);

  const categoryName = t.categories?.[recipe.category] || recipe.category;
  const difficultyName = t.difficulties?.[recipe.difficulty] || recipe.difficulty;

  return (
    <article className="recipe-card">
      <div className="recipe-image-wrapper">
        <img
          src={localizedRecipe.image || recipe.image}
          alt={localizedRecipe.title}
          className="recipe-image"
          loading="lazy"
        />

        <button
          type="button"
          className={`favorite-btn ${favorite ? "favorite-active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(recipe);
          }}
          aria-label={
            favorite
              ? t.common?.removeFavorite || "Remove from favorites"
              : t.common?.addFavorite || "Add to favorites"
          }
          title={
            favorite
              ? t.common?.removeFavorite || "Remove from favorites"
              : t.common?.addFavorite || "Add to favorites"
          }
        >
          {favorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="recipe-info">
        <div className="recipe-card-top">
          <span className="recipe-category">
            {categoryName}
          </span>
          {localizedRecipe.cuisine && (
            <span className="recipe-cuisine-tag">
              {localizedRecipe.cuisine}
            </span>
          )}
        </div>

        <h3 dir="auto">{localizedRecipe.title}</h3>

        <div className="recipe-meta">
          <span>⏱️ {localizedRecipe.time}</span>
          <span>⭐ {difficultyName}</span>
        </div>

        <Link
          to={`/recipe/${recipe.id}`}
          className="view-recipe-btn"
          aria-label={`${t.common?.viewRecipe || "View Recipe"}: ${localizedRecipe.title}`}
        >
          <span>{t.common?.viewRecipe || "View Recipe"}</span>
          <span className="btn-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;
