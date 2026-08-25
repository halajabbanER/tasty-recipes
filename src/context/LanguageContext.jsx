import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import en from "../assets/data/translations/en.json";
import ar from "../assets/data/translations/ar.json";
import tr from "../assets/data/translations/tr.json";

export const LanguageContext = createContext();

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", dir: "ltr" },
];

const translations = {
  en,
  ar,
  tr,
};

export function getLocalizedRecipe(recipe, currentLang = "en") {
  if (!recipe) return null;
  const lang = currentLang === "ar" || currentLang === "tr" ? currentLang : "en";
  const localizedData = recipe.localizations?.[lang] || {};

  return {
    ...recipe,
    title: localizedData.title || recipe.title,
    cuisine: localizedData.cuisine || recipe.cuisine,
    description: localizedData.description || recipe.description,
    didYouKnow: localizedData.didYouKnow || recipe.didYouKnow,
    time: localizedData.time || recipe.time,
    ingredients: localizedData.ingredients || recipe.ingredients,
    steps: localizedData.steps || recipe.steps,
  };
}

function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem("tasty-recipes-language");
    if (saved && ["en", "ar", "tr"].includes(saved)) {
      return saved;
    }
    return "en";
  });

  const setLanguage = useCallback((newLang) => {
    if (["en", "ar", "tr"].includes(newLang)) {
      setLanguageState(newLang);
    }
  }, []);

  const direction = language === "ar" ? "rtl" : "ltr";
  const isRtl = language === "ar";

  useEffect(() => {
    localStorage.setItem("tasty-recipes-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.documentElement.setAttribute("data-lang", language);
  }, [language, direction]);

  const t = useMemo(() => {
    return translations[language] || translations.en;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      direction,
      isRtl,
      t,
      languages: SUPPORTED_LANGUAGES,
      getLocalizedRecipe: (recipe) => getLocalizedRecipe(recipe, language),
    }),
    [language, setLanguage, direction, isRtl, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
