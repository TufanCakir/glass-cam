import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function WebBrowserScreen({ navigation, route }) {
  const url = route?.params?.url || "https://www.google.de";
  const webViewRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={1}>
            Web
          </Text>
        </View>
      </View>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        startInLoadingState
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(20, 21, 32, 0.93)",
  },
  headerWrapper: {
    height: 54,
    justifyContent: "flex-end",
    borderBottomWidth: 0,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 10,
    overflow: "hidden",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 5,
    height: 54,
  },
  backButton: {
    padding: 6,
    marginRight: 8,
    borderRadius: 100,
    backgroundColor: "rgba(30,30,40,0.5)",
    overflow: "hidden",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginLeft: 2,
    textShadowColor: "rgba(0,0,0,0.22)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.3,
  },
  webview: {
    flex: 1,
    backgroundColor: "transparent",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
});
