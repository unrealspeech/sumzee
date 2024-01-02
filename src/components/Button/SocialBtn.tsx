import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text } from "../Typography";
import React from "react";
import { WIDTH } from "../../Constants";

interface SocialBtnProps {
  onPress?: () => void;
  type: "google" | "facebook" | "apple";
  text: string;
}
export default function SocialBtn({ type, onPress, text }: SocialBtnProps) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.container]}>
      {type === "apple" ? (
        <Image
          style={{ width: 27, height: 27, marginRight: 5 }}
          source={require("../../../assets/apple.png")}
        />
      ) : type === "facebook" ? (
        <Image
          style={{ width: 24, height: 24, marginRight: 10 }}
          source={require("../../../assets/facebook.png")}
        />
      ) : (
        <Image
          style={{ width: 45, height: 45, marginRight: 0 }}
          source={require("../../../assets/google.png")}
        />
      )}
      <Text sx={{ fontFamily: "hMedium" }}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 9,
    width: WIDTH - 80,
    marginVertical: 5,
  },
});
