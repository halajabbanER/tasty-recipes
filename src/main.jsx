import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import FavoritesProvider from "./context/FavoritesContext.jsx";

import "./index.css";
import ThemeProvider from "./context/ThemeContext.jsx";
import LanguageProvider from "./context/LanguageContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

      <ThemeProvider>

        <LanguageProvider>

          <FavoritesProvider>
            <App />
          </FavoritesProvider>

        </LanguageProvider>

      </ThemeProvider>

    </BrowserRouter>
  </StrictMode>
);