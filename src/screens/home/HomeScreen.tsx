import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import { SafeView, Text } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { BORDER_RADIUS, MARGIN, PADDING, WIDTH } from "../../Constants";
import { colors } from "../../theme";
import { files } from "../../mock";

const HomeScreen = () => {
  const handleDocumentPick = async () => {
    try {
      console.log("Started.....");
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });
      if (result) {
        console.log("Selected file: ", result);
        uploadDocument(result);
      }
    } catch (err) {
      Alert.alert("Error", "An error occurred while picking the document.");
      console.error(err);
    }
  };

  const uploadDocument = async (
    pickerResult: DocumentPicker.DocumentPickerResult
  ) => {
    if (
      pickerResult.canceled ||
      !pickerResult.assets ||
      pickerResult.assets.length === 0
    ) {
      console.log("Document picking was cancelled or no file was selected.");
      return;
    }

    const file = pickerResult.assets[0];
    const fileUri = file.uri;
    const fileType = file.mimeType || "application/octet-stream";

    try {
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <View style={styles.container}>
      <SafeView>
        <View style={styles.topBar}>
          <Text color="#fff" variant="h1" sx={styles.title}>
            Files
          </Text>
          <View style={styles.topBarRight}>
            <View style={styles.proBtn}>
              <Text sx={styles.proBtnText}>Go Pro</Text>
            </View>
            <Ionicons name="settings" size={24} color="white" />
          </View>
        </View>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={"#ffffff60"}
            style={styles.searchInput}
          />
          <Ionicons name="search" size={24} color={"#ffffff60"} />
        </View>
        <View style={styles.filterBar}>
          <Ionicons name="time-outline" size={20} color={"#ffffff"} />
          <Text color="#fff" sx={styles.filterBarText} variant="footnote">
            Recents
          </Text>
          <Ionicons name="chevron-down" size={20} color={"#ffffff"} />
        </View>

        <FlatList
          data={files}
          contentContainerStyle={{
            paddingHorizontal: PADDING,
            paddingBottom: PADDING * 7,
          }}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.fileCard}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={
                    item.type === "epub" || item.type === "txt"
                      ? "document-text"
                      : "document"
                  }
                  size={34}
                  color={
                    item.type === "epub" || item.type === "txt"
                      ? "#6ACED9"
                      : "#F2B6E8"
                  }
                />
              </View>
              <View style={styles.fileDetails}>
                <View>
                  <Text color="#fff" sx={styles.documentName} fontSize={16}>
                    {item.name}
                  </Text>
                  <Text color="#fff" variant="pm">
                    {item.dateAdded}
                  </Text>
                </View>
                <TouchableOpacity activeOpacity={0.8}>
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={24}
                    color={"#ffffff"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeView>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleDocumentPick}
        style={styles.fixedBtn}
      >
        <Ionicons name="add" size={35} color={"#FFFFFF"} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161314",
    flex: 1,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: PADDING,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  proBtn: {
    backgroundColor: "#6ACED9",
    borderRadius: BORDER_RADIUS * 2,
    padding: 5,
    marginRight: MARGIN,
    justifyContent: "center",
    alignItems: "center",
  },
  proBtnText: {
    fontFamily: "hMedium",
  },
  title: {
    fontFamily: "hBold",
  },
  searchBar: {
    backgroundColor: "#1F1E1D",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: PADDING,
    paddingVertical: PADDING / 2,
    width: WIDTH - 40,
    borderRadius: BORDER_RADIUS * 2,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: MARGIN,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontFamily: "hMedium",
    marginRight: MARGIN,
    fontSize: 16,
  },
  textLight: {
    color: "#fff",
  },
  filterBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: PADDING,
    paddingVertical: PADDING / 2,
    marginTop: MARGIN,
    borderRadius: BORDER_RADIUS * 2,
  },
  filterBarText: {
    marginHorizontal: MARGIN - 8,
    fontFamily: "hBold",
  },
  fileCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: PADDING,
    paddingVertical: PADDING / 2,
    marginTop: MARGIN,
  },
  iconContainer: {
    backgroundColor: "#1F1E1D",
    padding: 10,
    borderRadius: 5,
    marginRight: MARGIN,
  },
  fileDetails: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  documentName: {
    fontFamily: "hBold",
    paddingBottom: PADDING / 3,
  },
  fixedBtn: {
    position: "absolute",
    bottom: MARGIN * 2,
    right: 0,
    margin: MARGIN,
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS * 2,
    backgroundColor: colors.primary[500],
    justifyContent: "center",
    alignItems: "center",
  },
});
