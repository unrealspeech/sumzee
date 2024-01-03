import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";
import FeatherIcon from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeView } from "../../components";

interface FormState {
  language: string;
  darkMode: boolean;
  wifi: boolean;
}

interface SectionItem {
  id: string;
  label: string;
  icon: string;
  type: "select" | "toggle" | "link";
}

interface Section {
  header: string;
  items: SectionItem[];
}

const SECTIONS: Section[] = [
  {
    header: "Account",
    items: [
      { id: "name", icon: "user", label: "Ajaga Abdulbasit", type: "link" },
      {
        id: "mail",
        icon: "mail",
        label: "ajagatobby@gmail.com",
        type: "link",
      },
      { id: "language", icon: "globe", label: "Language", type: "select" },
    ],
  },

  {
    header: "Support",
    items: [
      {
        id: "support",
        icon: "help-circle",
        label: "Contact support",
        type: "link",
      },
      {
        id: "feedback",
        icon: "send",
        label: "Leave feedback",
        type: "link",
      },
    ],
  },
  {
    header: "Legal",
    items: [
      {
        id: "privacy",
        icon: "shield",
        label: "Privacy policy",
        type: "link",
      },
      {
        id: "terms",
        icon: "file-text",
        label: "Terms of service",
        type: "link",
      },
    ],
  },
  {
    header: "Follow us",
    items: [
      { id: "fb", icon: "facebook", label: "Facebook", type: "link" },
      { id: "tiktok", icon: "instagram", label: "Instagram", type: "link" },
      { id: "x", icon: "twitter", label: "X/Twitter", type: "link" },
    ],
  },
];

export default function SettingsScreen({ navigation }: any) {
  const [form, setForm] = useState<FormState>({
    language: "English",
    darkMode: true,
    wifi: false,
  });

  const handleToggle = (id: string) => {
    setForm({ ...form, [id]: !form[id] });
  };

  return (
    <SafeView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.header}
        >
          <Ionicons name="chevron-back" size={35} color={"#FFFFFF"} />
          <Text style={styles.title}>Settings</Text>
        </TouchableOpacity>
        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View>
              {items.map(({ id, label, icon, type }) => (
                <TouchableOpacity
                  key={id}
                  onPress={() => {}}
                  activeOpacity={0.8}
                >
                  <View
                    style={[styles.row, type === "select" && styles.selectRow]}
                  >
                    <FeatherIcon
                      color="#FFF"
                      name={icon}
                      style={styles.rowIcon}
                      size={20}
                    />
                    <Text style={styles.rowLabel}>{label}</Text>
                    <View style={styles.rowSpacer} />
                    {type === "select" && (
                      <Text style={styles.rowValue}>{form[id]}</Text>
                    )}
                    {type === "toggle" && (
                      <Switch
                        onValueChange={() => handleToggle(id)}
                        value={form[id]}
                      />
                    )}
                    {(type === "select" || type === "link") && (
                      <FeatherIcon
                        color="#ababab"
                        name="chevron-right"
                        size={22}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161314",
  },
  scrollContainer: {
    paddingVertical: 24,
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontFamily: "hMedium",
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFF",
    fontFamily: "hBold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#ffffff10",
    backgroundColor: "#1F1E1D",
  },
  selectRow: {
    borderTopWidth: 1,
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FFF",
    fontFamily: "hRegular",
  },
  rowValue: {
    fontSize: 15,
    color: "#FFF",
    marginRight: 4,
    fontFamily: "hRegular",
  },
  rowSpacer: {
    flex: 1,
  },
});
