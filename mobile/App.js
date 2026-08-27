import React from "react";
import { Cairo_400Regular, Cairo_600SemiBold, Cairo_700Bold, Cairo_800ExtraBold, useFonts as useCairoFonts } from "@expo-google-fonts/cairo";
import { Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold, Outfit_800ExtraBold, useFonts as useOutfitFonts } from "@expo-google-fonts/outfit";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MobileApp from "./src/MobileApp.jsx";

export default function App() {
  const [cairoLoaded] = useCairoFonts({ Cairo_400Regular, Cairo_600SemiBold, Cairo_700Bold, Cairo_800ExtraBold });
  const [outfitLoaded] = useOutfitFonts({ Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold, Outfit_800ExtraBold });
  if (!cairoLoaded || !outfitLoaded) return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fffaf5" }}><ActivityIndicator color="#e76f51" size="large" /></View>;
  return <SafeAreaProvider><StatusBar style="auto" /><MobileApp /></SafeAreaProvider>;
}
