import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import { colors } from "../../../shared/tokens/colors.js";
import { radii } from "../../../shared/tokens/radii.js";
import { shadows } from "../../../shared/tokens/shadows.js";
import { spacing } from "../../../shared/tokens/spacing.js";
import { typography } from "../../../shared/tokens/typography.js";

const STORAGE_KEY = "tasty_recipes_mobile_theme";
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved === "light" || saved === "dark") setTheme(saved);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(() => {
    const isDark = theme === "dark";
    return {
      theme,
      themeName: theme,
      isDark,
      setTheme,
      toggleTheme: () => setTheme((current) => (current === "light" ? "dark" : "light")),
      colors: {
        ...(isDark ? colors.dark : colors.light),
        primary: colors.primary,
        primaryHover: colors.primaryHover,
        primaryLight: isDark ? colors.primaryLightDark : colors.primaryLight,
        primarySoft: isDark ? colors.primaryLightDark : colors.primaryLight,
        text: isDark ? colors.dark.textPrimary : colors.light.textPrimary,
        mutedText: isDark ? colors.dark.textMuted : colors.light.textMuted,
      },
      spacing,
      radii,
      shadows,
      typography,
    };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}

export default ThemeProvider;
