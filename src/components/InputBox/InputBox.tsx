import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

type InputBoxProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType:
    | "decimal-pad"
    | "default"
    | "email-address"
    | "number-pad"
    | "numbers-and-punctuation"
    | "numeric"
    | "phone-pad"
    | "twitter"
    | "url"
    | "visible-password"
    | "web-search";
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  showClearButton?: boolean;
};

const InputBox: React.FC<InputBoxProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry = false,
  autoCapitalize = "none",
  showClearButton = true,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        placeholderTextColor={"#ffffff80"}
        style={styles.textInputStyles}
      />
      {showClearButton && value ? (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <Ionicons name="close-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default InputBox;
