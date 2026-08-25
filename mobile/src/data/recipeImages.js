const images = {
  "/images/Kibbeh_Safarjaliyeh.jpg": require("../../assets/images/Kibbeh_Safarjaliyeh.jpg"),
  "/images/Lahm Bi Ajeen.jpg": require("../../assets/images/Lahm Bi Ajeen.jpg"),
  "/images/Meals/Falafel.jpg": require("../../assets/images/Meals/Falafel.jpg"),
  "/images/Meals/Foul.webp": require("../../assets/images/Meals/Foul.webp"),
  "/images/Meals/Hummus.jpg": require("../../assets/images/Meals/Hummus.jpg"),
  "/images/Meals/Mutabbal.jpg": require("../../assets/images/Meals/Mutabbal.jpg"),
  "/images/Meals/Syrian Fatayer.webp": require("../../assets/images/Meals/Syrian Fatayer.webp"),
  "/images/Meals/pizza.avif": require("../../assets/images/home.jpg"),
  "/images/Shish-Barak.jpg": require("../../assets/images/Shish-Barak.jpg"),
  "/images/bechamel-pasta.jpg": require("../../assets/images/bechamel-pasta.jpg"),
  "/images/desserts/Baklava.jpg": require("../../assets/images/desserts/Baklava.jpg"),
  "/images/desserts/Halawet El Jibn.jpg": require("../../assets/images/desserts/Halawet El Jibn.jpg"),
  "/images/desserts/halu arabic.jpg": require("../../assets/images/desserts/halu arabic.jpg"),
  "/images/desserts/harisa.jpg": require("../../assets/images/desserts/harisa.jpg"),
  "/images/desserts/ishabyat.jpg": require("../../assets/images/desserts/ishabyat.jpg"),
  "/images/desserts/kunafa-dessert.jpg": require("../../assets/images/desserts/kunafa-dessert.jpg"),
  "/images/eggplant-kebab.jpg": require("../../assets/images/eggplant-kebab.jpg"),
  "/images/fattoush.webp": require("../../assets/images/fattoush.webp"),
  "/images/kibbah.webp": require("../../assets/images/kibbah.webp"),
  "/images/lentil-soup.jpg": require("../../assets/images/lentil-soup.jpg"),
  "/images/maamoul.jpg": require("../../assets/images/maamoul.jpg"),
  "/images/mahashi.webp": require("../../assets/images/mahashi.webp"),
  "/images/molokhia.jpg": require("../../assets/images/molokhia.jpg"),
  "/images/okra.jpg": require("../../assets/images/okra.jpg"),
  "/images/syrian/images.jpg": require("../../assets/images/syrian/images.jpg"),
  "/images/syrian/lahm-bi-karaz.png": require("../../assets/images/syrian/lahm-bi-karaz.png"),
  "/images/syrian/yabraq.png": require("../../assets/images/syrian/yabraq.png"),
  "/images/tabbouleh.jpg": require("../../assets/images/tabbouleh.jpg"),
  "/images/tr-images/Menemen.jpg": require("../../assets/images/tr-images/Menemen.jpg"),
  "/images/tr-images/Sütlaç.jpg": require("../../assets/images/tr-images/Sütlaç.jpg"),
  "/images/tr-images/cigkofte.jpg": require("../../assets/images/tr-images/cigkofte.jpg"),
  "/images/tr-images/iskender-kebap.webp": require("../../assets/images/tr-images/iskender-kebap.webp"),
  "/images/tr-images/karniyarik.jpg": require("../../assets/images/tr-images/karniyarik.jpg"),
  "/images/tr-images/manti.jpg": require("../../assets/images/tr-images/manti.jpg"),
  "/images/tr-images/pide.jpg": require("../../assets/images/tr-images/pide.jpg"),
};

const fallbackImage = require("../../assets/images/home.jpg");

export function getRecipeImage(path) {
  return images[path] || fallbackImage;
}

export default images;
