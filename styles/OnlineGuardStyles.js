import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  message: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 0.15,
  },
  subtext: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 16,
  },
});
