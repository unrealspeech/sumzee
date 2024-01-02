import { StyleSheet, View, Image } from "react-native";
import { Button, SafeView, Text } from "../../components";
import React from "react";
import { PADDING } from "../../Constants";
import SocialBtn from "../../components/Button/SocialBtn";
import DividerWithText from "../../components/dividerWithText";
import { useNavigation } from "@react-navigation/native";

export default function SignInScreen() {
  const navigations = useNavigation();
  return (
    <View style={styles.container}>
      <SafeView>
        <View style={styles.signInContainer}>
          <View />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text color={"#fff"} variant="display">
              Ronnie AI
            </Text>
            <Text
              variant="headline"
              textAlign="center"
              lineHeight={21}
              sx={{
                paddingHorizontal: PADDING * 3,
                paddingVertical: PADDING,
              }}
              color={"#fff"}
              fontWeight="500"
            >
              Seemlessly turn text documents to speech using natural language
              processing and machine learning.
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <SocialBtn text="Sign in with Google" type="google" />
            <SocialBtn text="Sign in with Facebook" type="facebook" />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <DividerWithText />
            <Button
              onPress={() => {
                //@ts-ignore
                navigations.navigate("Home");
              }}
              variant="text"
              textSx={{ color: "#fff", fontSize: 14 }}
            >
              Continue as annoymous
            </Button>
          </View>
        </View>
      </SafeView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#10091B",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signInContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
});
