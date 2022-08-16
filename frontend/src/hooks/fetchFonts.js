import * as Font from 'expo-font';

export default fetchFonts = () => {
  return Font.loadAsync({
    MontserratRegular: require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat/Montserrat-Bold.ttf"),
    MontserratItalic: require("../assets/fonts/Montserrat/Montserrat-Italic.ttf"),
    MontserratBoldItalic: require("../assets/fonts/Montserrat/Montserrat-BoldItalic.ttf"),
    SFRegular: require("../assets/fonts/SF/SF-Pro-Display-Regular.otf"),
    SFBold: require("../assets/fonts/SF/SF-Pro-Display-Bold.otf"),
    SFItalic: require("../assets/fonts/SF/SF-Pro-Display-RegularItalic.otf"),
  });
};
