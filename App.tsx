import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./appNavigator";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    hBold: require("./assets/fonts/Gilroy/Gilroy-Bold.ttf"),
    hRegular: require("./assets/fonts/Gilroy/Gilroy-Regular.ttf"),
    hMedium: require("./assets/fonts/Gilroy/Gilroy-Medium.ttf"),
    hSemiBold: require("./assets/fonts/Gilroy/Gilroy-SemiBold.ttf"),
    regular: require("./assets/fonts/Gordita/Gordita-Regular.otf"),
    medium: require("./assets/fonts/Gordita/Gordita-Medium.otf"),
    light: require("./assets/fonts/Gordita/Gordita-Light.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
