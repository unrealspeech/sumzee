import { StyleSheet } from "react-native";
import { APPBAR_HEIGHT, STATUSBAR_HEIGHT } from "../../Constants/dimensions";

const styles = StyleSheet.create({
 
    container: {
        flex: 1,
      },
      statusBar: {
        height: STATUSBAR_HEIGHT,
      },
      appBar: {
        backgroundColor: "#79B45D",
        height: APPBAR_HEIGHT,
      },
      content: {
        flex: 1,
        backgroundColor: "#33373B",
      },
});

export default styles;
