import { useContext } from "react";
import { Link } from "react-router-dom";

import { FavoritesContext } from "../context/FavoritesContext";
import { LanguageContext } from "../context/LanguageContext";
import RecipeCard from "../components/RecipeCard";
import "../styles/FavoritesPage.css";

function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext);
  const { t } = useContext(LanguageContext);

  return (
    <div className="favorites-page">

      <div className="favorites-header">

        <span className="section-small-title">
          ❤️ {t.favorites?.badge || "Saved Recipes"}
        </span>

        <h1>{t.favorites?.title || "My Favorites"}</h1>

        <p>
          {t.favorites?.description ||
            "Save your favorite recipes and find them easily whenever you want."}
        </p>

      </div>

      {favorites.length > 0 ? (
        <>
          <div className="favorites-count">
            <strong>{favorites.length}</strong>{" "}
            {favorites.length === 1
              ? t.favorites?.countSingular || t.favorites?.count || "favorite recipe"
              : t.favorites?.count || "favorite recipes"}
          </div>

          <div className="recipes-grid">

            {favorites.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
              />
            ))}

          </div>
        </>
      ) : (
        <div className="empty-favorites">

          <div className="empty-heart" aria-hidden="true">
            🤍
          </div>

          <h2>{t.favorites?.emptyTitle || "No favorites yet"}</h2>

          <p>
            {t.favorites?.emptyText ||
              "Explore our recipes and save the dishes you love."}
          </p>

          <Link
            to="/recipes"
            className="primary-btn"
          >
            {t.favorites?.exploreBtn || "Explore Recipes"}
          </Link>

        </div>
      )}

    </div>
  );
}

export default FavoritesPage;
