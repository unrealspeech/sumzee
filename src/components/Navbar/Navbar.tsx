import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import styles from './styles'

type NavBarProps = {
  onPress?: ()=>void;
  navigation?: any;

};

const Navbar = ({onPress}:NavBarProps) => {
  return (
    <View
      style={styles.container}
    >
      <TouchableOpacity
      onPress={onPress}
        style={styles.iconContainer}
      >
        <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
