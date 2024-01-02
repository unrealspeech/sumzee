import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "./Typography";
const DividerWithText = () => {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <Text sx={{ paddingHorizontal: 10 }} color={"#fff"} style={styles.text}>
        OR
      </Text>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: "30%",
    marginVertical: 10,
  },
  text: {
    marginHorizontal: 10,
  },
});

export default DividerWithText;
