import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useLanguage } from "../context/LanguageContext.jsx";
import { useTheme } from "../theme/ThemeContext.jsx";

export function MetaBox({ icon, label, value }) {
  const { colors } = useTheme();
  const { textAlign, fontFamily, fontFamilyBold } = useLanguage();
  return <View style={[styles.meta, { backgroundColor: colors.metaBoxBackground, borderColor: colors.metaBoxBorder }]}><Text style={styles.metaIcon}>{icon}</Text><Text style={[styles.label, { color: colors.textMuted, textAlign, fontFamily }]}>{label}</Text><Text style={[styles.value, { color: colors.textHeading, textAlign, fontFamily: fontFamilyBold }]}>{value}</Text></View>;
}

export function DidYouKnow({ title, text }) {
  const { colors } = useTheme();
  const { textAlign, fontFamily, fontFamilyBold } = useLanguage();
  if (!text) return null;
  return <View style={[styles.fact, { backgroundColor: colors.didYouKnowBg, borderColor: colors.didYouKnowBorder }]}><Text style={styles.bulb}>💡</Text><View style={{ flex: 1 }}><Text style={[styles.factTitle, { color: colors.didYouKnowHeading, textAlign, fontFamily: fontFamilyBold }]}>{title}</Text><Text style={[styles.factText, { color: colors.didYouKnowText, textAlign, fontFamily }]}>{text}</Text></View></View>;
}

export function EmptyState({ icon = "🔍", title, description, actionText, onAction }) {
  const { colors } = useTheme();
  const { textAlign, fontFamily, fontFamilyBold } = useLanguage();
  return <View style={[styles.empty, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={styles.emptyIcon}>{icon}</Text><Text style={[styles.emptyTitle, { color: colors.textHeading, fontFamily: fontFamilyBold }]}>{title}</Text><Text style={[styles.emptyText, { color: colors.textMuted, textAlign, fontFamily }]}>{description}</Text>{actionText && <Pressable onPress={onAction} style={[styles.action, { backgroundColor: colors.primary }]}><Text style={[styles.actionText, { fontFamily: fontFamilyBold }]}>{actionText}</Text></Pressable>}</View>;
}

const styles = StyleSheet.create({
  meta: { flex: 1, minWidth: 96, borderWidth: 1, borderRadius: 14, padding: 11, alignItems: "center" },
  metaIcon: { fontSize: 20 }, label: { fontSize: 10, marginTop: 4 }, value: { fontSize: 12, marginTop: 2 },
  fact: { flexDirection: "row", gap: 12, padding: 17, borderRadius: 18, borderWidth: 1, marginVertical: 16 },
  bulb: { fontSize: 25 }, factTitle: { fontSize: 16, marginBottom: 4 }, factText: { fontSize: 13, lineHeight: 21 },
  empty: { padding: 32, borderWidth: 1, borderStyle: "dashed", borderRadius: 22, alignItems: "center", marginVertical: 20 },
  emptyIcon: { fontSize: 44 }, emptyTitle: { fontSize: 19, marginTop: 10 }, emptyText: { fontSize: 13, lineHeight: 20, marginTop: 6 },
  action: { paddingHorizontal: 22, paddingVertical: 12, borderRadius: 13, marginTop: 18 }, actionText: { color: "white", fontSize: 14 },
});
