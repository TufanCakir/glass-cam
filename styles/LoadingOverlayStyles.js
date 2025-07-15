import { StyleSheet } from "react-native";

export default StyleSheet.create({
  loadingOverlayBlack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.20)", // halbtransparentes "Glas"
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
  },
});
