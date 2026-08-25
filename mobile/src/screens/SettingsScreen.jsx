import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../components/AppHeader.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useTheme } from "../theme/ThemeContext.jsx";

const languages = [
  { code: "ar", label: "العربية", native: "ع" },
  { code: "en", label: "English", native: "EN" },
  { code: "tr", label: "Türkçe", native: "TR" },
];

export default function SettingsScreen({ navigation }) {
  const { language, setLanguage, t, textAlign, fonts } = useLanguage();
  const { themeName, setTheme, colors } = useTheme();
  const { clearFavorites } = useFavorites();

  const resetApplication = () => {
    Alert.alert(t.settings?.resetTitle ?? "Reset settings", t.settings?.resetConfirm ?? "Are you sure?", [
      { text: t.common?.cancel ?? "Cancel", style: "cancel" },
      {
        text: t.common?.confirm ?? "Confirm",
        style: "destructive",
        onPress: async () => {
          await clearFavorites();
          await setLanguage("ar");
          await setTheme("light");
        },
      },
    ]);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppHeader title={t.navbar?.settings ?? "Settings"} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SettingSection title={t.settings?.language ?? "Language"} icon="language-outline" colors={colors} fonts={fonts} textAlign={textAlign}>
          <View style={styles.optionGrid}>
            {languages.map((item) => {
              const selected = language === item.code;
              return (
                <Pressable
                  key={item.code}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => setLanguage(item.code)}
                  style={[styles.option, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.primarySoft : colors.surface }]}
                >
                  <Text style={[styles.optionSymbol, { color: selected ? colors.primary : colors.text, fontFamily: fonts.heading }]}>{item.native}</Text>
                  <Text style={[styles.optionLabel, { color: colors.text, fontFamily: fonts.body }]}>{item.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </SettingSection>

        <SettingSection title={t.settings?.appearance ?? "Appearance"} icon="color-palette-outline" colors={colors} fonts={fonts} textAlign={textAlign}>
          <View style={styles.optionGrid}>
            {[
              { value: "light", label: t.settings?.light ?? "Light", icon: "sunny-outline" },
              { value: "dark", label: t.settings?.dark ?? "Dark", icon: "moon-outline" },
            ].map((item) => {
              const selected = themeName === item.value;
              return (
                <Pressable
                  key={item.value}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => setTheme(item.value)}
                  style={[styles.themeOption, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.primarySoft : colors.surface }]}
                >
                  <Ionicons name={item.icon} size={25} color={selected ? colors.primary : colors.mutedText} />
                  <Text style={[styles.optionLabel, { color: colors.text, fontFamily: fonts.body }]}>{item.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </SettingSection>

        <Pressable onPress={() => navigation.navigate("About")} style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="information-circle-outline" size={25} color={colors.primary} />
          <Text style={[styles.rowText, { color: colors.text, fontFamily: fonts.body, textAlign }]}>{t.navbar?.about ?? "About"}</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.mutedText} />
        </Pressable>

        <Pressable onPress={resetApplication} style={[styles.resetButton, { borderColor: colors.primary }]}>
          <Ionicons name="refresh-outline" size={21} color={colors.primary} />
          <Text style={[styles.resetText, { color: colors.primary, fontFamily: fonts.heading }]}>{t.settings?.reset ?? "Reset settings"}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function SettingSection({ title, icon, children, colors, fonts, textAlign }) {
  return (
    <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.sectionTitleRow}>
        <Ionicons name={icon} size={23} color={colors.primary} />
        <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.heading, textAlign }]}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 18, gap: 16, paddingBottom: 36 },
  section: { borderWidth: 1, borderRadius: 24, padding: 18, gap: 16 },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  sectionTitle: { flex: 1, fontSize: 19 },
  optionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  option: { minWidth: 92, flexGrow: 1, alignItems: "center", paddingVertical: 14, paddingHorizontal: 10, borderWidth: 1, borderRadius: 18, gap: 5 },
  optionSymbol: { fontSize: 21 },
  optionLabel: { fontSize: 14 },
  themeOption: { flex: 1, minWidth: 125, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9, padding: 16, borderWidth: 1, borderRadius: 18 },
  row: { minHeight: 64, flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderRadius: 20, paddingHorizontal: 18 },
  rowText: { flex: 1, fontSize: 17 },
  resetButton: { minHeight: 54, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderWidth: 1, borderRadius: 18 },
  resetText: { fontSize: 16 },
});
