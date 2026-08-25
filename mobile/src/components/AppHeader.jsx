import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useLanguage } from "../context/LanguageContext.jsx";
import { useTheme } from "../theme/ThemeContext.jsx";

export default function AppHeader({ navigation, title, canGoBack = false }) {
  const insets = useSafeAreaInsets();
  const { colors, theme, toggleTheme } = useTheme();
  const { t, language, setLanguage, rowDirection, fontFamilyBold } = useLanguage();
  const nextLanguage = language === "ar" ? "en" : language === "en" ? "tr" : "ar";

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.row, { flexDirection: rowDirection }]}>
        <View style={[styles.brand, { flexDirection: rowDirection }]}>
          {canGoBack && (
            <Pressable onPress={() => navigation.goBack()} style={[styles.circle, { backgroundColor: colors.primaryLight }]}>
              <Ionicons name={language === "ar" ? "arrow-forward" : "arrow-back"} size={20} color={colors.primary} />
            </Pressable>
          )}
          <Text style={styles.logo}>🍽️</Text>
          <Text numberOfLines={1} style={[styles.title, { color: colors.primary, fontFamily: fontFamilyBold }]}>
            {title || t.navbar?.logo || "Tasty Recipes"}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable onPress={toggleTheme} style={[styles.circle, { backgroundColor: colors.primaryLight }]}>
            <Ionicons name={theme === "light" ? "moon-outline" : "sunny-outline"} size={19} color={colors.primary} />
          </Pressable>
          <Pressable onPress={() => setLanguage(nextLanguage)} style={[styles.language, { borderColor: colors.border }]}>
            <Text style={{ color: colors.textPrimary, fontFamily: fontFamilyBold }}>{language.toUpperCase()}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderBottomWidth: StyleSheet.hairlineWidth, paddingHorizontal: 16, paddingBottom: 10 },
  row: { alignItems: "center", justifyContent: "space-between" },
  brand: { alignItems: "center", flex: 1, gap: 7 },
  logo: { fontSize: 22 },
  title: { fontSize: 19, flexShrink: 1 },
  actions: { flexDirection: "row", alignItems: "center", gap: 8 },
  circle: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center" },
  language: { minWidth: 42, height: 38, paddingHorizontal: 8, borderWidth: 1, borderRadius: 12, alignItems: "center", justifyContent: "center" },
});
