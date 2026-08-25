import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";

import { useFavorites } from "../context/FavoritesContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { getRecipeImage } from "../data/recipeImages.js";
import { useTheme } from "../theme/ThemeContext.jsx";

export default function RecipeCard({ recipe, navigation, compact = false }) {
  const { colors, shadows } = useTheme();
  const { t, getLocalizedRecipe, textAlign, fontFamily, fontFamilyBold, rowDirection } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [scale] = useState(() => new Animated.Value(1));
  const localized = getLocalizedRecipe(recipe);
  const favorite = isFavorite(recipe.id);

  const toggle = () => {
    toggleFavorite(recipe);
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.25, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Pressable
      onPress={() => navigation.navigate("RecipeDetails", { recipeId: recipe.id })}
      style={[styles.card, compact && styles.compact, { backgroundColor: colors.surface, borderColor: colors.border }, shadows.md.mobile]}
    >
      <View>
        <Image source={getRecipeImage(recipe.image)} style={[styles.image, compact && styles.compactImage]} resizeMode="cover" />
        <Pressable onPress={toggle} hitSlop={10} style={styles.favorite}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons name={favorite ? "heart" : "heart-outline"} color={favorite ? "#e44d62" : "#553b32"} size={22} />
          </Animated.View>
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={[styles.category, { color: colors.primary, backgroundColor: colors.primaryLight, fontFamily: fontFamilyBold, textAlign }]}>
          {t.categories?.[recipe.category] || recipe.category}
        </Text>
        <Text numberOfLines={2} style={[styles.name, { color: colors.textHeading, fontFamily: fontFamilyBold, textAlign }]}>{localized.title}</Text>
        <View style={[styles.meta, { flexDirection: rowDirection }]}>
          <Text style={[styles.metaText, { color: colors.textMuted, fontFamily }]}>⏱ {localized.time}</Text>
          <Text style={[styles.metaText, { color: colors.textMuted, fontFamily }]}>⭐ {t.difficulties?.[recipe.difficulty] || recipe.difficulty}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: "100%", borderWidth: 1, borderRadius: 22, overflow: "hidden", marginBottom: 16 },
  compact: { width: 250, marginEnd: 14 },
  image: { width: "100%", height: 190, backgroundColor: "#f7ede8" },
  compactImage: { height: 145 },
  favorite: { position: "absolute", top: 12, right: 12, width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.94)", alignItems: "center", justifyContent: "center" },
  content: { padding: 16 },
  category: { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, fontSize: 12, overflow: "hidden" },
  name: { fontSize: 19, lineHeight: 27, marginTop: 9, marginBottom: 12 },
  meta: { justifyContent: "space-between", alignItems: "center" },
  metaText: { fontSize: 12 },
});
