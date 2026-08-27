import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import AppHeader from "../components/AppHeader.jsx";
import { EmptyState } from "../components/MetaWidgets.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { allRecipes, categoryBySlug } from "../data/recipes.js";
import { useTheme } from "../theme/ThemeContext.jsx";

export default function RecipesScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { t, getLocalizedRecipe, textAlign, fontFamily, fontFamilyBold } = useLanguage();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(() => route.params?.cuisine || route.params?.category || "all");
  React.useEffect(() => { if (route.params?.cuisine || route.params?.category) setFilter(route.params.cuisine || route.params.category); }, [route.params]);
  const options = [["all", t.recipes?.all], ["syrian", t.recipes?.syrian], ["turkish", t.recipes?.turkish], ["dessert", t.recipes?.desserts], ["appetizer", t.recipes?.appetizers], ["main-dish", t.categoriesPage?.mainDishes], ["soup", t.categoriesPage?.soups], ["salad", t.categoriesPage?.salads], ["breakfast", t.categoriesPage?.breakfast]];
  const recipes = useMemo(() => allRecipes.filter((recipe) => {
    if (filter === "syrian" && !recipe.id.startsWith("sy-")) return false;
    if (filter === "turkish" && !recipe.id.startsWith("tr-")) return false;
    const category = categoryBySlug[filter];
    if (category && recipe.category !== category.value) return false;
    const term = query.trim().toLocaleLowerCase(); if (!term) return true;
    const localized = getLocalizedRecipe(recipe);
    return [recipe.title, recipe.description, localized.title, localized.description, ...(recipe.ingredients || []), ...(localized.ingredients || [])].some((value) => String(value).toLocaleLowerCase().includes(term));
  }), [filter, query, getLocalizedRecipe]);
  return <View style={[styles.root, { backgroundColor: colors.background }]}><AppHeader navigation={navigation} title={t.recipes?.title} canGoBack /><FlatList data={recipes} keyExtractor={(item) => item.id} renderItem={({ item }) => <RecipeCard recipe={item} navigation={navigation} />} contentContainerStyle={styles.list} ListHeaderComponent={<><TextInput value={query} onChangeText={setQuery} placeholder={t.recipes?.searchPlaceholder} placeholderTextColor={colors.textMuted} style={[styles.search, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.textPrimary, textAlign, fontFamily }]} /><FlatList horizontal data={options} keyExtractor={(item) => item[0]} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters} renderItem={({ item }) => <Pressable onPress={() => setFilter(item[0])} style={[styles.chip, { backgroundColor: filter === item[0] ? colors.primary : colors.surface, borderColor: filter === item[0] ? colors.primary : colors.border }]}><Text style={{ color: filter === item[0] ? "white" : colors.textPrimary, fontFamily: fontFamilyBold }}>{item[1]}</Text></Pressable>} /><Text style={[styles.count, { color: colors.textMuted, fontFamily }]}>{recipes.length} {recipes.length === 1 ? t.recipes?.foundSingular : t.recipes?.found}</Text></>} ListEmptyComponent={<EmptyState title={t.recipes?.noResultsTitle} description={t.recipes?.noResultsText} actionText={t.recipes?.clearSearch} onAction={() => { setQuery(""); setFilter("all"); }} />}/></View>;
}
const styles = StyleSheet.create({ root: { flex: 1 }, list: { padding: 16, paddingBottom: 30 }, search: { height: 52, borderWidth: 1, borderRadius: 17, paddingHorizontal: 16, fontSize: 14 }, filters: { gap: 8, paddingVertical: 14 }, chip: { paddingHorizontal: 15, paddingVertical: 9, borderRadius: 999, borderWidth: 1 }, count: { textAlign: "center", marginBottom: 12, fontSize: 13 } });
