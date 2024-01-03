import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { HEIGHT, WIDTH } from "../../Constants";
import { Text } from "../Typography";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { clamp } from "react-native-redash";

interface SpeedModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpeedModal = ({ isOpen, setIsOpen }: SpeedModalProps) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const closedObserver = useSharedValue(false);
  const display = useSharedValue(0);
  const MODAL_HEIGHT = HEIGHT / 3;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      display: display.value === 0 ? "none" : "flex",
      height: MODAL_HEIGHT,
      transform: [{ translateY: translateY.value }],
    };
  });

  const closeModal = () => {
    translateY.value = withSpring(1000, { duration: 3000 });
    opacity.value = withSpring(0, { duration: 3000 });
    closedObserver.value = true;
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { y: number; shouldClose: boolean }) => {
      ctx.y = translateY.value;
      closedObserver.value = false;
    },
    onActive: (event, ctx) => {
      const newValue = ctx.y + event.translationY;

      if (newValue > MODAL_HEIGHT / 1.8) {
        ctx.shouldClose = true;
      } else {
        ctx.shouldClose = false;
        translateY.value = clamp(newValue, 0, MODAL_HEIGHT);
      }
    },
    onEnd: (_, ctx) => {
      if (ctx.shouldClose) {
        translateY.value = withSpring(1000);
        opacity.value = 0;
        closedObserver.value = true;
        display.value = 0;
      } else if (
        translateY.value > 0 &&
        translateY.value < MODAL_HEIGHT / 1.8
      ) {
        translateY.value = withTiming(0);
      }
    },
  });

  const openModal = () => {
    translateY.value = withTiming(0);
    opacity.value = withTiming(1);
    display.value = withTiming(1);
  };

  React.useEffect(() => {
    if (isOpen) {
      openModal();
    }
    setIsOpen(false);
  }, [isOpen]);

  React.useEffect(() => {
    if (closedObserver.value === true) {
      setIsOpen(false);
    }
  }, [closedObserver.value]);

  // renders
  return (
    <Animated.View style={[styles.modalContainer, animatedStyles]}>
      <TouchableOpacity
        onPress={closeModal}
        style={styles.backdrop}
      ></TouchableOpacity>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.container, animatedStyles]}>
          <TouchableOpacity
            onPress={closeModal}
            style={styles.straightLine}
          ></TouchableOpacity>
          <View style={styles.contentContainer}></View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    width: WIDTH,
    height: HEIGHT,
    bottom: 0,
    zIndex: 100,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    // flex: 1,
    padding: 24,
    backgroundColor: "#1F1E1D",
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 100,
  },
  contentContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  iconOverlay: {
    alignSelf: "flex-end",
    marginBottom: 20,
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161314",
  },
  voiceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    width: WIDTH - 40,
  },
  block1: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageWrapper: {},
  image: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: "#161314",
    justifyContent: "center",
    alignItems: "center",
  },
  voiceBody: {
    marginLeft: 10,
  },
  checkOverlay: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginRight: 10,
  },
  straightLine: {
    width: 50,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default SpeedModal;
