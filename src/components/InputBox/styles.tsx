import { StyleSheet } from "react-native";
import { colors } from "../../theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textInputStyles: { width: "90%", height: "100%", color: "#fff" },
});

export default styles;
