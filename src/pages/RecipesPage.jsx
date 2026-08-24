import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import RecipeCard from "../components/RecipeCard";
import recipesData from "../assets/data/recipes.json";
import "../styles/RecipesPage.css";

function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");

  const cuisine = searchParams.get("cuisine");
  const category = searchParams.get("category");

  const filteredRecipes = useMemo(() => {
    let recipes = [
      ...recipesData.recipes,
      ...recipesData.turkishRecipes,
      ...recipesData.dessertRecipes,
    ];

    if (cuisine === "syrian") {
      recipes = recipesData.recipes;
    }

    if (cuisine === "turkish") {
      recipes = recipesData.turkishRecipes;
    }

    if (category === "dessert") {
      recipes = recipesData.dessertRecipes;
    }

    if (searchTerm.trim()) {
      recipes = recipes.filter((recipe) =>
        recipe.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    return recipes;
  }, [cuisine, category, searchTerm]);

  const getPageTitle = () => {
    if (cuisine === "syrian") {
      return "Syrian Recipes 🇸🇾";
    }

    if (cuisine === "turkish") {
      return "Turkish Recipes 🇹🇷";
    }

    if (category === "dessert") {
      return "Desserts 🍰";
    }

    return "All Recipes 🍽️";
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

  return (
    <div className="recipes-page">

      {/* Header */}
      <div className="recipes-page-header">
        <span>Explore our collection</span>

        <h1>{getPageTitle()}</h1>

        <p>
          Discover delicious Syrian and Turkish dishes,
          traditional recipes and sweet desserts.
        </p>
      </div>


      {/* Search */}
      <div className="recipes-search">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />

        {searchTerm && (
          <button
            className="clear-search"
            onClick={() => setSearchTerm("")}
          >
            ✕
          </button>
        )}

      </div>


      {/* Filters */}
      <div className="recipe-filters">

        <button
          className={
            !cuisine && !category
              ? "filter-btn active-filter"
              : "filter-btn"
          }
          onClick={showAllRecipes}
        >
          🍽️ All
        </button>

        <button
          className={
            cuisine === "syrian"
              ? "filter-btn active-filter"
              : "filter-btn"
          }
          onClick={showSyrianRecipes}
        >
          Syrian Foods
        </button>

        <button
          className={
            cuisine === "turkish"
              ? "filter-btn active-filter"
              : "filter-btn"
          }
          onClick={showTurkishRecipes}
        >
           Turkish Foods
        </button>

        <button
          className={
            category === "dessert"
              ? "filter-btn active-filter"
              : "filter-btn"
          }
          onClick={showDesserts}
        >
          🍰 Desserts 
        </button>

      </div>


      {/* Results count */}
      <div className="recipes-results">

        <p>
          <strong>{filteredRecipes.length}</strong>
          {" "}recipes found
        </p>

      </div>


      {/* Recipes */}
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

          <div>🔍</div>

          <h3>No recipes found</h3>

          <p>
            Try searching for another recipe.
          </p>

        </div>

      )}

    </div>
  );
}

export default RecipesPage;
