import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Text } from "../Typography";
import { PADDING } from "../../Constants";
import Button from "../Button";
import { useRoute, RouteProp, NavigationProp } from "@react-navigation/native";

// Define the type for your navigation structure if needed
type RootStackParamList = {
  History: undefined;
  Profile: undefined;
};

type BottomNavigationProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const BottomNavigation: React.FC<BottomNavigationProps> = ({ navigation }) => {
  const route =
    useRoute<RouteProp<RootStackParamList, keyof RootStackParamList>>();

  const isActive = (tabName: keyof RootStackParamList) => {
    return route.name === tabName;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.navItem}
        onPress={() => navigation.navigate("History")}
      >
        <Ionicons
          name="ios-document-text-outline"
          size={24}
          color={isActive("History") ? "#FFFFFF" : "#ffffff80"}
        />
        <Text
          sx={styles.navText}
          color={isActive("History") ? "#FFFFFF" : "#ffffff80"}
        >
          History
        </Text>
      </TouchableOpacity>

      <Button size="small">Create</Button>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.navItem}
        onPress={() => navigation.navigate("Profile")}
      >
        <Feather
          name="user"
          size={24}
          color={isActive("Profile") ? "#FFFFFF" : "#ffffff80"}
        />
        <Text
          sx={styles.navText}
          fontSize={13}
          color={isActive("Profile") ? "#FFFFFF" : "#ffffff80"}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: "#2B2A2A",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: PADDING * 3,
    alignItems: "flex-start",
    height: 95,
    paddingTop: PADDING - 5,
    backgroundColor: "#2B2A2A",
    position: "absolute",
    elevation: 8,
    bottom: 0,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    paddingTop: 5,
  },
});

export default BottomNavigation;
