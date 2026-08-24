import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (recipeId) => {
    return favorites.some(
      (recipe) => String(recipe.id) === String(recipeId)
    );
  };

  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe.id)) {
      setFavorites((prev) =>
        prev.filter(
          (item) => String(item.id) !== String(recipe.id)
        )
      );
    } else {
      setFavorites((prev) => [...prev, recipe]);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;