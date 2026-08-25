import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import CategoriesPage from "./pages/CategoriesPage";

function App() {
  return (
    <>
      <Navbar />

      <main className="page-container">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/recipes"
            element={<RecipesPage />}
          />

          <Route
            path="/categories"
            element={<CategoriesPage />}
          />

          <Route
            path="/recipe/:id"
            element={<RecipeDetailsPage />}
          />

          <Route
            path="/favorites"
            element={<FavoritesPage />}
          />

          <Route
            path="/about"
            element={<AboutPage />}
          />

          <Route
            path="/settings"
            element={<SettingsPage />}
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
