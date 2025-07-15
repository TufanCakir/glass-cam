import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    paddingBottom: Platform.OS === "ios" ? 26 : 18,
    alignItems: "center",
    zIndex: 99,
    overflow: "hidden",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    top: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  iconText: {
    fontSize: 13,
    color: "#fff",
    opacity: 0.82,
    marginTop: 2,
    textAlign: "center",
    letterSpacing: 0.12,
  },
});
