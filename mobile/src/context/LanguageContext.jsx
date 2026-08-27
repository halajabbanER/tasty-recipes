import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { I18nManager } from "react-native";

import ar from "../../../src/assets/data/translations/ar.json";
import en from "../../../src/assets/data/translations/en.json";
import tr from "../../../src/assets/data/translations/tr.json";
import { getLocalizedRecipe, SUPPORTED_LANGUAGES } from "../../../shared/utils/localization.js";

const STORAGE_KEY = "tasty_recipes_mobile_language";
const translations = { ar, en, tr };
const LanguageContext = createContext(null);

I18nManager.allowRTL(true);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("ar");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (["ar", "en", "tr"].includes(saved)) setLanguageState(saved);
    });
  }, []);

  const setLanguage = useCallback((nextLanguage) => {
    if (!["ar", "en", "tr"].includes(nextLanguage)) return;
    setLanguageState(nextLanguage);
    AsyncStorage.setItem(STORAGE_KEY, nextLanguage);
  }, []);

  const value = useMemo(() => {
    const isRtl = language === "ar";
    return {
      language,
      setLanguage,
      isRtl,
      direction: isRtl ? "rtl" : "ltr",
      textAlign: isRtl ? "right" : "left",
      rowDirection: isRtl ? "row-reverse" : "row",
      fontFamily: isRtl ? "Cairo_400Regular" : "Outfit_400Regular",
      fontFamilyBold: isRtl ? "Cairo_700Bold" : "Outfit_700Bold",
      fonts: {
        body: isRtl ? "Cairo_400Regular" : "Outfit_400Regular",
        heading: isRtl ? "Cairo_700Bold" : "Outfit_700Bold",
      },
      t: translations[language] || translations.ar,
      languages: SUPPORTED_LANGUAGES,
      getLocalizedRecipe: (recipe) => getLocalizedRecipe(recipe, language),
    };
  }, [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export default LanguageProvider;
