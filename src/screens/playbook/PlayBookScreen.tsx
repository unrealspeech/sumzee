import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeView, Text, VoicesModal } from "../../components";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BORDER_RADIUS, HEIGHT, WIDTH } from "../../Constants";
import { colors } from "../../theme";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { clamp } from "react-native-redash";

export default function PlayBookScreen({ navigation }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  const SLIDER_WIDTH = 15;
  const translateX = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    const constrainedX = clamp(translateX.value, 0, WIDTH - 40);
    return {
      transform: [{ translateX: constrainedX }],
    };
  });

  const trackAnimatedStyles = useAnimatedStyle(() => {
    const constrainedWidth = clamp(translateX.value, 0, WIDTH - 40);
    return {
      width: constrainedWidth,
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { x: number }) => {
      ctx.x = translateX.value;
    },
    onActive: (event, ctx) => {
      const newX = ctx.x + event.translationX;
      translateX.value = clamp(newX, 0, WIDTH - 40 - SLIDER_WIDTH);
    },
    onEnd: (event, ctx) => {
      const newX = ctx.x + event.translationX;
      translateX.value = clamp(newX, 0, WIDTH - 40 - SLIDER_WIDTH);
    },
  });
  return (
    <View style={styles.container}>
      <VoicesModal setIsOpen={setIsOpen} isOpen={isOpen} />

      <SafeView>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Home")}
          style={styles.appBar}
        >
          <Ionicons name="ios-arrow-back" size={24} color={"#FFFFFF"} />
        </TouchableOpacity>
        <View style={styles.mainContent}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
              height: HEIGHT - 240,
            }}
          >
            <Text color="#fff" variant="h2" lineHeight={32}>
              Page 1 of 42 Hello ABDULBASIT, -, 10 ADEOLA THANNI STREET, GRAMMAR
              SCHOOL, IKORODU. Please find below your bank statement for the
              period: August 09, 2023 to October 09, 2023. 8/10/2023
              902KLNT23222IOL8 NIBSS:JOSEPH UCHE IGWE:Transf er from to AJAGA
              ABDULBASIT T OBI:1000042308101433231057 00835948 MOB.BNKG:238/ F&T
              STORES/DG BNK:VULTE FT FROM: AJAGA ABD ULBASIT TOBI TO: F T
              STORES:TT: 0F253FACA1638272807061369 2131004:000008230810161147
              707541873509:FEE NIBSS:IFEANYI NDUKA:Transfer f rom to AJAGA
              ABDULBASIT TOBI: 10000423081110041610571740 9736 2,000.00 2,427.42
              8/10/2023 902FTIB232220
            </Text>
          </ScrollView>
          <View style={styles.bottomBar}>
            <View>
              <View>
                <View style={styles.slider}>
                  <Animated.View style={[styles.track, trackAnimatedStyles]} />
                </View>
                <PanGestureHandler onGestureEvent={gestureHandler}>
                  <Animated.View style={[styles.thumb, animatedStyles]}>
                    <Ionicons name="ellipse" size={10} color={"#FFFFFF"} />
                  </Animated.View>
                </PanGestureHandler>
              </View>
              <View style={styles.timestamp}>
                <Text color="#ffffff80" variant="pm">
                  0:00
                </Text>
                <Text color="#ffffff80" variant="pm">
                  0:44:38
                </Text>
              </View>
            </View>
            <View style={styles.controls}>
              <View style={styles.wrapper}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.iconOverlay}
                >
                  <Text
                    color="#ffffff"
                    fontSize={14}
                    sx={{ fontFamily: "hBold" }}
                  >
                    1x
                  </Text>
                </TouchableOpacity>
                <Text variant="headline" color={"#ffffff80"}>
                  Speed
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.playBtn}>
                <Ionicons name="play" size={35} color={"#FFFFFF"} />
              </TouchableOpacity>
              <View style={styles.wrapper}>
                <TouchableOpacity
                  onPress={() => setIsOpen(true)}
                  activeOpacity={0.8}
                  style={styles.iconOverlay}
                >
                  <MaterialIcons
                    name="record-voice-over"
                    size={24}
                    color="#ffffff"
                  />
                </TouchableOpacity>
                <Text variant="headline" color={"#ffffff80"}>
                  Voices
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161314",
    flex: 1,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  mainContent: {
    justifyContent: "space-between",
  },
  slider: {
    width: WIDTH - 40,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#1F1E1D",
    alignSelf: "center",
  },
  track: {
    width: "50%",
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.primary[500],
  },
  bottomBar: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  thumb: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: colors.primary[500],
    position: "absolute",
    top: -5,
    left: "0%",
    justifyContent: "center",
    alignItems: "center",
  },
  timestamp: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH - 40,
    marginTop: 10,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: WIDTH - 180,
    marginTop: 10,
  },
  iconOverlay: {
    backgroundColor: "#1F1E1D",
    padding: 10,
    borderRadius: BORDER_RADIUS * 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  playBtn: {
    backgroundColor: colors.primary[500],
    padding: 10,
    borderRadius: BORDER_RADIUS * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});
