import { useContext, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import RecipeCard from "../components/RecipeCard";
import recipesData from "../assets/data/recipes.json";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/RecipesPage.css";

const categoryMap = {
  "main-dish": { value: "Main Dish", label: "mainDishes", icon: "🍲" },
  soup: { value: "Soup", label: "soups", icon: "🥣" },
  salad: { value: "Salad", label: "salads", icon: "🥗" },
  dessert: { value: "Dessert", label: "desserts", icon: "🍰" },
  appetizer: { value: "Appetizer", label: "appetizers", icon: "🧆" },
  breakfast: { value: "Breakfast", label: "breakfast", icon: "🍳" },
};

function RecipesPage() {
  const { t } = useContext(LanguageContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const cuisine = searchParams.get("cuisine");
  const category = searchParams.get("category");
  const selectedCategory = categoryMap[category];

  const filteredRecipes = useMemo(() => {
    let recipes = [
      ...recipesData.syrianRecipes,
      ...recipesData.turkishRecipes,
      ...recipesData.dessertRecipes,
      ...recipesData.appetizerRecipes,
    ];

    if (cuisine === "syrian") {
      recipes = recipesData.syrianRecipes;
    }

    if (cuisine === "turkish") {
      recipes = recipesData.turkishRecipes;
    }

    if (selectedCategory) {
      recipes = recipes.filter(
        (recipe) => recipe.category === selectedCategory.value
      );
    }

    const query = searchTerm.trim().toLowerCase();
    if (query) {
      recipes = recipes.filter((recipe) => {
        // Search in base English data
        const matchBaseTitle = recipe.title?.toLowerCase().includes(query);
        const matchBaseDesc = recipe.description?.toLowerCase().includes(query);
        const matchBaseIngredients = recipe.ingredients?.some((ing) =>
          ing.toLowerCase().includes(query)
        );

        // Search in Arabic localizations
        const arData = recipe.localizations?.ar;
        const matchArTitle = arData?.title?.toLowerCase().includes(query);
        const matchArDesc = arData?.description?.toLowerCase().includes(query);
        const matchArIngredients = arData?.ingredients?.some((ing) =>
          ing.toLowerCase().includes(query)
        );

        // Search in Turkish localizations
        const trData = recipe.localizations?.tr;
        const matchTrTitle = trData?.title?.toLowerCase().includes(query);
        const matchTrDesc = trData?.description?.toLowerCase().includes(query);
        const matchTrIngredients = trData?.ingredients?.some((ing) =>
          ing.toLowerCase().includes(query)
        );

        return (
          matchBaseTitle ||
          matchBaseDesc ||
          matchBaseIngredients ||
          matchArTitle ||
          matchArDesc ||
          matchArIngredients ||
          matchTrTitle ||
          matchTrDesc ||
          matchTrIngredients
        );
      });
    }

    return recipes;
  }, [cuisine, selectedCategory, searchTerm]);

  const getPageTitle = () => {
    if (cuisine === "syrian") {
      return t.recipes?.syrianTitle || "Syrian Recipes";
    }

    if (cuisine === "turkish") {
      return t.recipes?.turkishTitle || "Turkish Recipes";
    }

    if (selectedCategory) {
      return `${t.categoriesPage?.[selectedCategory.label] || selectedCategory.value} ${selectedCategory.icon}`;
    }

    return `${t.recipes?.title || "All Recipes"} 🍽️`;
  };

  const showAllRecipes = () => {
    setSearchParams({});
  };

  const showSyrianRecipes = () => {
    setSearchParams({
      cuisine: "syrian",
    });
  };

  const showTurkishRecipes = () => {
    setSearchParams({
      cuisine: "turkish",
    });
  };

  const showDesserts = () => {
    setSearchParams({
      category: "dessert",
    });
  };

  const showAppetizers = () => {
    setSearchParams({
      category: "appetizer",
    });
  };

  return (
    <div className="recipes-page">

      <div className="recipes-page-header">
        <span>{t.recipes?.subtitle || "Explore our collection"}</span>

        <h1>{getPageTitle()}</h1>

        <p>
          {t.recipes?.description ||
            "Discover delicious Syrian and Turkish dishes, traditional recipes and sweet desserts."}
        </p>
      </div>

      <div className="recipe-search">
        <span className="search-icon" aria-hidden="true">🔍</span>

        <input
          type="search"
          placeholder={t.recipes?.searchPlaceholder || "Search by recipe name or ingredient..."}
          aria-label={t.recipes?.searchAria || "Search recipes"}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        {searchTerm && (
          <button
            className="clear-search"
            type="button"
            aria-label={t.recipes?.clearSearch || "Clear search"}
            onClick={() => setSearchTerm("")}
          >
            ✕
          </button>
        )}
      </div>

      <div className="recipe-filters" role="group" aria-label="Recipe Filters">

        <button
          type="button"
          className={
            !cuisine && !category
              ? "filter-btn active-filter"
              : "filter-btn"
          }
          onClick={showAllRecipes}
        >
          {t.recipes?.all || "All"}
        </button>

        <button
          type="button"
          className={
            cuisine === "syrian"
              ? "filter-btn active-filter"
              : "filter-btn"
          }
          onClick={showSyrianRecipes}
        >
          {t.recipes?.syrian || "Syrian"}
        </button>

        <button
          type="button"
          className={
            cuisine === "turkish"
              ? "filter-btn active-filter"
              : "filter-btn"
          }
          onClick={showTurkishRecipes}
        >
          {t.recipes?.turkish || "Turkish"}
        </button>

        <button
          type="button"
          className={
            category === "dessert"
              ? "filter-btn active-filter"
              : "filter-btn"
          }
          onClick={showDesserts}
        >
          🍰 {t.recipes?.desserts || "Desserts"}
        </button>

        <button
          type="button"
          className={
            category === "appetizer"
              ? "filter-btn active-filter"
              : "filter-btn"
          }
          onClick={showAppetizers}
        >
          🥗 {t.recipes?.appetizers || "Appetizers"}
        </button>

      </div>

      {/* Results count */}
      <div className="recipes-results">
        <p>
          <strong>{filteredRecipes.length}</strong>{" "}
          {filteredRecipes.length === 1
            ? t.recipes?.foundSingular || t.recipes?.found || "recipe found"
            : t.recipes?.found || "recipes found"}
        </p>
      </div>

      {/* Recipes Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          ))}
        </div>
      ) : (
        <div className="no-recipes">
          <div aria-hidden="true">🔍</div>
          <h3>{t.recipes?.noResultsTitle || "No recipes found"}</h3>
          <p>
            {t.recipes?.noResultsText || "Try searching with different keywords or clear the filters."}
          </p>
        </div>
      )}

    </div>
  );
}

export default RecipesPage;
