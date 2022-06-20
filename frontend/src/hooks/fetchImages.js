import { Asset } from "expo-asset";

export default function fetchImages(images) {
  //Converts object into array of object's values so map function will indivudally cache them
  const imagesArray = Object.values(images);
  return imagesArray.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
