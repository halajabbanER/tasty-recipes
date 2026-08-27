import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import recipesData from "../assets/data/recipes.json";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/CategoriesPage.css";

const categoryCards = [
  { key: "mainDishes", value: "Main Dish", slug: "main-dish", icon: "🍲", image: "/images/kibbah.webp" },
  { key: "soups", value: "Soup", slug: "soup", icon: "🥣", image: "/images/lentil-soup.jpg" },
  { key: "salads", value: "Salad", slug: "salad", icon: "🥗", image: "/images/fattoush.webp" },
  { key: "desserts", value: "Dessert", slug: "dessert", icon: "🍰", image: "/images/desserts/kunafa-dessert.jpg" },
  { key: "appetizers", value: "Appetizer", slug: "appetizer", icon: "🧆", image: "/images/Meals/Falafel.jpg" },
  { key: "breakfast", value: "Breakfast", slug: "breakfast", icon: "🍳", image: "/images/tr-images/Menemen.jpg" },
];

function CategoriesPage() {
  const { t } = useContext(LanguageContext);

  const recipeCounts = useMemo(() => {
    const allRecipes = Object.values(recipesData).flat();

    return allRecipes.reduce((counts, recipe) => {
      counts[recipe.category] = (counts[recipe.category] || 0) + 1;
      return counts;
    }, {});
  }, []);

  return (
    <div className="categories-page">
      <header className="categories-header">
        <span>{t.categoriesPage.badge}</span>
        <h1>{t.categoriesPage.title}</h1>
        <p>{t.categoriesPage.description}</p>
        <Link to="/recipes" className="categories-all-link">
          {t.categoriesPage.viewAll}
          <span aria-hidden="true">→</span>
        </Link>
      </header>

      <section className="categories-grid" aria-label={t.categoriesPage.title}>
        {categoryCards.map((category) => (
          <Link
            key={category.slug}
            to={`/recipes?category=${category.slug}`}
            className="category-card"
            style={{ "--category-image": `url("${category.image}")` }}
          >
            <span className="category-card-icon" aria-hidden="true">
              {category.icon}
            </span>

            <div className="category-card-content">
              <h2>{t.categoriesPage[category.key]}</h2>
              <p>
                <strong>{recipeCounts[category.value] || 0}</strong>{" "}
                {recipeCounts[category.value] === 1
                  ? t.categoriesPage.recipeSingular
                  : t.categoriesPage.recipePlural}
              </p>
            </div>

            <span className="category-card-arrow" aria-hidden="true">→</span>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default CategoriesPage;
