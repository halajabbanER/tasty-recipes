import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import AppHeader from "../components/AppHeader.jsx";
import { EmptyState } from "../components/MetaWidgets.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useTheme } from "../theme/ThemeContext.jsx";

export default function FavoritesScreen({ navigation }) {
  const { colors } = useTheme(); const { favorites } = useFavorites(); const { t, textAlign, fontFamily, fontFamilyBold } = useLanguage();
  return <View style={[styles.root, { backgroundColor: colors.background }]}><AppHeader navigation={navigation} title={t.navbar?.favorites} /><FlatList data={favorites} keyExtractor={(item) => item.id} renderItem={({ item }) => <RecipeCard recipe={item} navigation={navigation} />} contentContainerStyle={styles.content} ListHeaderComponent={favorites.length ? <View style={styles.header}><Text style={[styles.title, { color: colors.textHeading, textAlign, fontFamily: fontFamilyBold }]}>{t.favorites?.title}</Text><Text style={[styles.text, { color: colors.textMuted, textAlign, fontFamily }]}>{favorites.length} {favorites.length === 1 ? t.favorites?.countSingular : t.favorites?.count}</Text></View> : null} ListEmptyComponent={<EmptyState icon="♡" title={t.favorites?.emptyTitle} description={t.favorites?.emptyText} actionText={t.favorites?.exploreBtn} onAction={() => navigation.navigate("Recipes")} />} /></View>;
}
const styles = StyleSheet.create({ root: { flex: 1 }, content: { padding: 16, flexGrow: 1 }, header: { marginBottom: 16 }, title: { fontSize: 28 }, text: { fontSize: 14, marginTop: 5 } });
