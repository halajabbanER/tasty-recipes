import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import AppHeader from "../components/AppHeader.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { allRecipes, categoryDefinitions } from "../data/recipes.js";
import { useTheme } from "../theme/ThemeContext.jsx";

export default function CategoriesScreen({ navigation }) {
  const { colors } = useTheme();
  const { t, textAlign, fontFamily, fontFamilyBold } = useLanguage();
  return <View style={[styles.root, { backgroundColor: colors.background }]}><AppHeader navigation={navigation} title={t.navbar?.categories} /><FlatList numColumns={2} data={categoryDefinitions} keyExtractor={(item) => item.slug} columnWrapperStyle={styles.row} contentContainerStyle={styles.content} ListHeaderComponent={<View style={styles.header}><Text style={[styles.badge, { color: colors.primary, textAlign, fontFamily: fontFamilyBold }]}>{t.categoriesPage?.badge}</Text><Text style={[styles.title, { color: colors.textHeading, textAlign, fontFamily: fontFamilyBold }]}>{t.categoriesPage?.title}</Text><Text style={[styles.description, { color: colors.textMuted, textAlign, fontFamily }]}>{t.categoriesPage?.description}</Text></View>} renderItem={({ item }) => <CategoryCard category={item} count={allRecipes.filter((recipe) => recipe.category === item.value).length} navigation={navigation} />} /></View>;
}
const styles = StyleSheet.create({ root: { flex: 1 }, content: { padding: 16, paddingBottom: 30 }, row: { gap: 12 }, header: { marginBottom: 20 }, badge: { fontSize: 12 }, title: { fontSize: 28, marginTop: 5 }, description: { fontSize: 14, lineHeight: 22, marginTop: 8 } });
