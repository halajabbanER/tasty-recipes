import React from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useLanguage } from "../context/LanguageContext.jsx";
import { getRecipeImage } from "../data/recipeImages.js";

export default function CategoryCard({ category, count, navigation }) {
  const { t, textAlign, fontFamily, fontFamilyBold } = useLanguage();
  return (
    <Pressable style={styles.card} onPress={() => navigation.navigate("Recipes", { category: category.slug })}>
      <ImageBackground source={getRecipeImage(category.image)} style={styles.background} imageStyle={styles.image}>
        <LinearGradient colors={["transparent", "rgba(30,17,12,0.92)"]} style={styles.gradient}>
          <View style={styles.icon}><Text style={styles.iconText}>{category.icon}</Text></View>
          <View>
            <Text style={[styles.title, { textAlign, fontFamily: fontFamilyBold }]}>{t.categoriesPage?.[category.key] || category.value}</Text>
            <Text style={[styles.count, { textAlign, fontFamily }]}>{count} {count === 1 ? t.categoriesPage?.recipeSingular : t.categoriesPage?.recipePlural}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: "46%", height: 190, borderRadius: 22, overflow: "hidden", marginBottom: 14 },
  background: { flex: 1 },
  image: { borderRadius: 22 },
  gradient: { flex: 1, justifyContent: "space-between", padding: 14 },
  icon: { width: 42, height: 42, borderRadius: 13, backgroundColor: "rgba(255,255,255,.92)", alignItems: "center", justifyContent: "center" },
  iconText: { fontSize: 22 },
  title: { color: "white", fontSize: 18, marginBottom: 3 },
  count: { color: "rgba(255,255,255,.82)", fontSize: 12 },
});
