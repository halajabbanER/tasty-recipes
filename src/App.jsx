import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import FavoritesPage from "./pages/FavoritesPage";
import SettingsPage from "./pages/SettingsPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";

function App() {
  return (
    <>
      <Navbar />

      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
