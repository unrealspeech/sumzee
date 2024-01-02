import { StyleSheet, View } from "react-native";
import React from "react";

import { Text } from "../../components";
import { MARGIN, PADDING } from "../../Constants";
import { FontAwesome5 } from "@expo/vector-icons";

const EmptyBox = ({ navigation }: any) => {
  return (
    <View style={styles.emptyBox}>
      <View style={styles.emptyBoxContent}>
        <FontAwesome5 name="box-open" size={45} color="#eeeeee60" />
      </View>
      <View style={{ height: MARGIN * 2 }} />

      <Text color={"#fff"} variant="h1" sx={styles.emptyBoxText}>
        No files yet
      </Text>
      <Text color={"#fff"} variant="footnote" sx={styles.footnote}>
        Hit the button down below to add your first file and see some magic 🎉
      </Text>
    </View>
  );
};

export default EmptyBox;

const styles = StyleSheet.create({
  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -MARGIN * 10,
  },
  emptyBoxContent: {
    backgroundColor: "#2B2A2A",
    padding: 20,
    borderRadius: 8,
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyBoxText: {
    fontFamily: "hBold",
    paddingLeft: 8,
  },
  footnote: {
    paddingHorizontal: PADDING * 4,
    textAlign: "center",
    color: "#eeeeee90",
    paddingTop: 10,
  },
});
