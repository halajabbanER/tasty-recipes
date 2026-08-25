import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../components/AppHeader.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useTheme } from "../theme/ThemeContext.jsx";

export default function AboutScreen({ navigation }) {
  const { t, textAlign, fonts } = useLanguage();
  const { colors } = useTheme();
  const about = t.about ?? {};

  const features = [
    { icon: "restaurant-outline", title: about.syrianTitle ?? "Syrian cuisine", text: about.syrianText ?? "Authentic recipes from Syria and Aleppo." },
    { icon: "cafe-outline", title: about.turkishTitle ?? "Turkish cuisine", text: about.turkishText ?? "Popular traditional Turkish recipes." },
    { icon: "language-outline", title: about.languagesTitle ?? "Three languages", text: about.languagesText ?? "Arabic, Turkish and English in one experience." },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppHeader navigation={navigation} title={about.title ?? t.navbar?.about ?? "About"} canGoBack />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: colors.primarySoft, borderColor: colors.border }]}>
          <View style={[styles.logoCircle, { backgroundColor: colors.surface }]}>
            <Ionicons name="restaurant" size={38} color={colors.primary} />
          </View>
          <Text style={[styles.heroTitle, { color: colors.primary, fontFamily: fonts.heading, textAlign }]}>{about.heroTitle ?? "Tasty Recipes"}</Text>
          <Text style={[styles.heroText, { color: colors.text, fontFamily: fonts.body, textAlign }]}>{about.heroText ?? "A warm collection of Syrian and Turkish recipes made for every table."}</Text>
        </View>

        <Text style={[styles.heading, { color: colors.text, fontFamily: fonts.heading, textAlign }]}>{about.whyTitle ?? "What you will find"}</Text>
        {features.map((feature) => (
          <View key={feature.title} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.iconBox, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name={feature.icon} size={27} color={colors.primary} />
            </View>
            <View style={styles.cardCopy}>
              <Text style={[styles.cardTitle, { color: colors.text, fontFamily: fonts.heading, textAlign }]}>{feature.title}</Text>
              <Text style={[styles.cardText, { color: colors.mutedText, fontFamily: fonts.body, textAlign }]}>{feature.text}</Text>
            </View>
          </View>
        ))}

        <View style={[styles.story, { borderColor: colors.border }]}>
          <Text style={[styles.heading, { color: colors.text, fontFamily: fonts.heading, textAlign }]}>{about.storyTitle ?? "Our story"}</Text>
          <Text style={[styles.storyText, { color: colors.mutedText, fontFamily: fonts.body, textAlign }]}>{about.storyText ?? "We preserve beloved family recipes and make them easy to discover, cook and share."}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 18, gap: 16, paddingBottom: 40 },
  hero: { alignItems: "center", borderWidth: 1, borderRadius: 28, padding: 26, gap: 12 },
  logoCircle: { width: 78, height: 78, borderRadius: 39, alignItems: "center", justifyContent: "center" },
  heroTitle: { width: "100%", fontSize: 30 },
  heroText: { width: "100%", fontSize: 16, lineHeight: 27 },
  heading: { fontSize: 22 },
  card: { flexDirection: "row", alignItems: "center", gap: 14, borderWidth: 1, borderRadius: 22, padding: 16 },
  iconBox: { width: 52, height: 52, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  cardCopy: { flex: 1, gap: 4 },
  cardTitle: { fontSize: 17 },
  cardText: { fontSize: 14, lineHeight: 22 },
  story: { borderWidth: 1, borderRadius: 24, padding: 19, gap: 10 },
  storyText: { fontSize: 15, lineHeight: 25 },
});
