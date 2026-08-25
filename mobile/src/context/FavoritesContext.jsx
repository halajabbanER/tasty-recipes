import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "tasty_recipes_mobile_favorites";
const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => setFavorites(saved ? JSON.parse(saved) : []))
      .catch(() => setFavorites([]))
      .finally(() => setIsReady(true));
  }, []);

  useEffect(() => {
    if (isReady) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites, isReady]);

  const isFavorite = useCallback(
    (recipeId) => favorites.some((recipe) => String(recipe.id) === String(recipeId)),
    [favorites]
  );
  const toggleFavorite = useCallback((recipe) => {
    setFavorites((current) =>
      current.some((item) => String(item.id) === String(recipe.id))
        ? current.filter((item) => String(item.id) !== String(recipe.id))
        : [...current, recipe]
    );
  }, []);
  const clearFavorites = useCallback(() => setFavorites([]), []);
  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, clearFavorites, isReady }),
    [favorites, isFavorite, toggleFavorite, clearFavorites, isReady]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
}

export default FavoritesProvider;
