import recipesData from "../../../src/assets/data/recipes.json";

export { recipesData };
export const allRecipes = Object.values(recipesData).flat();
export const categoryDefinitions = [
  { key: "mainDishes", value: "Main Dish", slug: "main-dish", icon: "🍲", image: "/images/kibbah.webp" },
  { key: "soups", value: "Soup", slug: "soup", icon: "🥣", image: "/images/lentil-soup.jpg" },
  { key: "salads", value: "Salad", slug: "salad", icon: "🥗", image: "/images/fattoush.webp" },
  { key: "desserts", value: "Dessert", slug: "dessert", icon: "🍰", image: "/images/desserts/kunafa-dessert.jpg" },
  { key: "appetizers", value: "Appetizer", slug: "appetizer", icon: "🧆", image: "/images/Meals/Falafel.jpg" },
  { key: "breakfast", value: "Breakfast", slug: "breakfast", icon: "🍳", image: "/images/tr-images/Menemen.jpg" },
];
export const categoryBySlug = Object.fromEntries(categoryDefinitions.map((category) => [category.slug, category]));
