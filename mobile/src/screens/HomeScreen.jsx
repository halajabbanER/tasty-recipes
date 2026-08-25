import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import AppHeader from "../components/AppHeader.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { recipesData } from "../data/recipes.js";
import { useTheme } from "../theme/ThemeContext.jsx";

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { t, textAlign, rowDirection, fontFamily, fontFamilyBold } = useLanguage();
  const sections = [
    ["syrian", t.home?.syrian, t.home?.syrianSmall, recipesData.syrianRecipes, { cuisine: "syrian" }],
    ["turkish", t.home?.turkish, t.home?.turkishSmall, recipesData.turkishRecipes, { cuisine: "turkish" }],
    ["dessert", t.home?.desserts, t.home?.dessertSmall, recipesData.dessertRecipes, { category: "dessert" }],
    ["appetizer", t.home?.appetizers, t.home?.appetizerSmall, recipesData.appetizerRecipes, { category: "appetizer" }],
  ];
  return <View style={[styles.root, { backgroundColor: colors.background }]}><AppHeader navigation={navigation} /><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={[styles.hero, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.badge, { color: colors.primary, backgroundColor: colors.primaryLight, fontFamily: fontFamilyBold }]}>{t.home?.badge}</Text>
      <Text style={[styles.heroTitle, { color: colors.textHeading, textAlign, fontFamily: fontFamilyBold }]}>{t.home?.title1} <Text style={{ color: colors.primary }}>{t.home?.title2}</Text></Text>
      <Text style={[styles.heroText, { color: colors.textMuted, textAlign, fontFamily }]}>{t.home?.description}</Text>
      <View style={[styles.heroActions, { flexDirection: rowDirection }]}><Pressable onPress={() => navigation.navigate("Recipes")} style={[styles.primary, { backgroundColor: colors.primary }]}><Text style={[styles.primaryText, { fontFamily: fontFamilyBold }]}>{t.home?.explore}</Text></Pressable><Pressable onPress={() => navigation.navigate("Favorites")} style={[styles.secondary, { borderColor: colors.border }]}><Text style={{ color: colors.textPrimary, fontFamily: fontFamilyBold }}>♡ {t.home?.favorites}</Text></Pressable></View>
    </View>
    {sections.map(([key, title, subtitle, recipes, params]) => <View key={key} style={styles.section}><View style={[styles.sectionHeader, { flexDirection: rowDirection }]}><View style={{ flex: 1 }}><Text style={[styles.subtitle, { color: colors.primary, textAlign, fontFamily: fontFamilyBold }]}>{subtitle}</Text><Text style={[styles.sectionTitle, { color: colors.textHeading, textAlign, fontFamily: fontFamilyBold }]}>{title}</Text></View><Pressable onPress={() => navigation.navigate("Recipes", params)}><Text style={{ color: colors.primary, fontFamily: fontFamilyBold }}>{t.home?.viewAll} →</Text></Pressable></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontal}>{recipes.slice(0, 5).map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} navigation={navigation} compact />)}</ScrollView></View>)}
  </ScrollView></View>;
}

const styles = StyleSheet.create({ root: { flex: 1 }, content: { paddingBottom: 28 }, hero: { margin: 16, padding: 22, borderRadius: 24, borderWidth: 1 }, badge: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, overflow: "hidden", fontSize: 12 }, heroTitle: { fontSize: 28, lineHeight: 38, marginTop: 14 }, heroText: { fontSize: 14, lineHeight: 23, marginTop: 10 }, heroActions: { gap: 10, marginTop: 18 }, primary: { flex: 1, padding: 13, borderRadius: 14, alignItems: "center" }, primaryText: { color: "white" }, secondary: { flex: 1, padding: 13, borderRadius: 14, borderWidth: 1, alignItems: "center" }, section: { marginTop: 14 }, sectionHeader: { alignItems: "flex-end", paddingHorizontal: 16, marginBottom: 12 }, subtitle: { fontSize: 12 }, sectionTitle: { fontSize: 22, marginTop: 3 }, horizontal: { paddingHorizontal: 16 } });
