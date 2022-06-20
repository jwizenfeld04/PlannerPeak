import * as Font from 'expo-font';

export default fetchFonts = () => {
  return Font.loadAsync({
    MontserratRegular: require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat/Montserrat-Bold.ttf"),
    MontserratItalic: require("../assets/fonts/Montserrat/Montserrat-Italic.ttf"),
    MontserratBoldItalic: require("../assets/fonts/Montserrat/Montserrat-BoldItalic.ttf"),
  });
};
