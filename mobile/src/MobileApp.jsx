import { Ionicons } from "@expo/vector-icons";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import FavoritesProvider, { useFavorites } from "./context/FavoritesContext.jsx";
import LanguageProvider, { useLanguage } from "./context/LanguageContext.jsx";
import AboutScreen from "./screens/AboutScreen.jsx";
import CategoriesScreen from "./screens/CategoriesScreen.jsx";
import FavoritesScreen from "./screens/FavoritesScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import RecipeDetailsScreen from "./screens/RecipeDetailsScreen.jsx";
import RecipesScreen from "./screens/RecipesScreen.jsx";
import SettingsScreen from "./screens/SettingsScreen.jsx";
import ThemeProvider, { useTheme } from "./theme/ThemeContext.jsx";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  const { colors } = useTheme();
  const { t, fontFamily } = useLanguage();
  const { favorites } = useFavorites();
  const insets = useSafeAreaInsets();
  const tabs = [
    ["Home", HomeScreen, t.navbar?.home, "home-outline"],
    ["Categories", CategoriesScreen, t.navbar?.categories, "grid-outline"],
    ["Favorites", FavoritesScreen, t.navbar?.favorites, "heart-outline"],
    ["Settings", SettingsScreen, t.navbar?.settings, "settings-outline"],
    ["About", AboutScreen, t.navbar?.about, "information-circle-outline"],
  ];
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarStyle: { height: 62 + insets.bottom, paddingTop: 7, paddingBottom: Math.max(8, insets.bottom), backgroundColor: colors.surface, borderTopColor: colors.border },
      tabBarLabelStyle: { fontFamily, fontSize: 10 },
      tabBarIcon: ({ color, size }) => <Ionicons name={tabs.find(([name]) => name === route.name)?.[3] || "ellipse-outline"} color={color} size={size} />,
    })}>
      {tabs.map(([name, component, label]) => (
        <Tab.Screen key={name} name={name} component={component} options={{ tabBarLabel: label || name, tabBarBadge: name === "Favorites" && favorites.length ? favorites.length : undefined }} />
      ))}
    </Tab.Navigator>
  );
}

function Navigator() {
  const { colors, isDark } = useTheme();
  const baseTheme = isDark ? DarkTheme : DefaultTheme;
  const theme = {
    ...baseTheme,
    dark: isDark,
    colors: {
      ...baseTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.textPrimary,
      border: colors.border,
      notification: colors.primary,
    },
  };
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Recipes" component={RecipesScreen} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function MobileApp() {
  return <ThemeProvider><LanguageProvider><FavoritesProvider><Navigator /></FavoritesProvider></LanguageProvider></ThemeProvider>;
}
