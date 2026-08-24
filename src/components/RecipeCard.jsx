function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">

      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipe-image"
      />

      <div className="recipe-info">

        <span className="recipe-category">
          {recipe.category}
        </span>

        <h3>{recipe.title}</h3>

        <div className="recipe-meta">
          <span>⏱️ {recipe.time}</span>
          <span>⭐ {recipe.difficulty}</span>
        </div>

        <button className="view-recipe-btn">
          View Recipe
        </button>

      </div>
    </div>
  );
}

export default RecipeCard;