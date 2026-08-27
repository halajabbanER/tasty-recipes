/**
 * Shared localization and recipe helpers
 */

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", dir: "ltr" },
];

export function getLocalizedRecipe(recipe, currentLang = "en") {
  if (!recipe) return null;
  const lang = currentLang === "ar" || currentLang === "tr" ? currentLang : "en";
  const localizedData = recipe.localizations?.[lang] || {};

  return {
    ...recipe,
    title: localizedData.title || recipe.title,
    cuisine: localizedData.cuisine || recipe.cuisine,
    description: localizedData.description || recipe.description,
    didYouKnow: localizedData.didYouKnow || recipe.didYouKnow,
    time: localizedData.time || recipe.time,
    ingredients: localizedData.ingredients || recipe.ingredients,
    steps: localizedData.steps || recipe.steps,
  };
}
