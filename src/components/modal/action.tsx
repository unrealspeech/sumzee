import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Text } from "../Typography";
import { HEIGHT, MARGIN, WIDTH } from "../../Constants";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ActionModal({ isOpen, onClose }: ActionModalProps) {
  console.log("Started.....", isOpen);

  const translateY = useSharedValue(100);

  function handleCloseModal() {
    onClose();
  }

  const modalStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: isOpen ? withTiming(0) : translateY.value,
        },
      ],
    };
  });
  return (
    <TouchableOpacity
      onPress={handleCloseModal}
      style={[styles.container, { display: isOpen ? "flex" : "none" }]}
    >
      <Animated.View style={[styles.modal, modalStyle]}>
        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Feather name="heart" size={20} color="#fff" />
          <Text color={"#fff"} sx={styles.modalText}>
            Favorite
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Feather name="trash" size={20} color="red" />
          <Text color={"#fff"} sx={styles.modalText}>
            Delete
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000059",
    flex: 1,
    position: "absolute",
    height: HEIGHT,
    width: WIDTH,
  },
  modal: {
    backgroundColor: "#1F1E1D",
    borderRadius: 10,
    padding: 10,
    height: 150,
    width: WIDTH,
    position: "absolute",
    left: 0,
    bottom: 0,
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: MARGIN,
  },
  modalText: {
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
  },
});
