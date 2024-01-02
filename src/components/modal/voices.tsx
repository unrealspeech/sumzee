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
import { voices } from "../../mock";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { clamp } from "react-native-redash";

interface VoiceModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VoicesModal = ({ isOpen, setIsOpen }: VoiceModalProps) => {
  const [selectedItem, setSelectedItem] = React.useState<any>(null);

  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const closedObserver = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const closeModal = () => {
    translateY.value = withSpring(1000, { duration: 3000 });
    opacity.value = withSpring(0, { duration: 3000 });
    closedObserver.value = true;
  };

  React.useEffect(() => {
    if (closedObserver.value === true) {
      setIsOpen(false);
    }
  }, [closedObserver.value]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { y: number; shouldClose: boolean }) => {
      ctx.y = translateY.value;
      closedObserver.value = false;
    },
    onActive: (event, ctx) => {
      const newValue = ctx.y + event.translationY;

      if (newValue > HEIGHT / 1.8) {
        ctx.shouldClose = true;
      } else {
        ctx.shouldClose = false;
        translateY.value = clamp(newValue, 0, HEIGHT - 40);
      }
    },
    onEnd: (_, ctx) => {
      if (ctx.shouldClose) {
        translateY.value = withSpring(1000);
        opacity.value = 0;
        closedObserver.value = true;
      }
    },
  });

  const openModal = () => {
    translateY.value = withTiming(0);
    opacity.value = withTiming(1);
  };

  React.useEffect(() => {
    if (isOpen) {
      openModal();
    }
    setIsOpen(false);
  }, [isOpen]);

  // renders
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, animatedStyles]}>
        <TouchableOpacity onPress={closeModal} style={styles.iconOverlay}>
          <Ionicons name="chevron-down" size={24} color={"#FFFFFF"} />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <Text variant="display" sx={{ marginBottom: 15 }} color={"#FFF"}>
            Voices
          </Text>
          <FlatList
            scrollEnabled={false}
            data={voices}
            horizontal={false}
            keyExtractor={(item) => item.voiceId}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.voiceContainer}
                onPress={() =>
                  setSelectedItem(
                    item.voiceId === selectedItem ? "" : item.voiceId
                  )
                }
              >
                <View style={styles.block1}>
                  <View style={styles.imageWrapper}>
                    <Image
                      style={styles.image}
                      source={{ uri: item.imageUri }}
                    />
                  </View>
                  <View style={styles.voiceBody}>
                    <Text
                      variant="sub-heading4"
                      sx={{ fontFamily: "hBold", marginBottom: 5 }}
                      color={"#FFF"}
                    >
                      {item.name}
                    </Text>
                    <Text variant="pm" color={"#FFFFFF80"}>
                      {item.country}
                    </Text>
                  </View>
                </View>
                {selectedItem === item.voiceId ||
                (item.name === "Scarlett" && !selectedItem) ? (
                  <View style={styles.checkOverlay}>
                    <Ionicons name="checkmark" size={20} color={"#000000"} />
                  </View>
                ) : null}
              </TouchableOpacity>
            )}
          />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#1F1E1D",
    position: "absolute",
    width: "100%",
    height: HEIGHT - 40,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000,
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
});

export default VoicesModal;
