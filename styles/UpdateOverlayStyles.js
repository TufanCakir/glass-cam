import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  updateOverlayBlock: {
    minWidth: 120,
    minHeight: 120,
    borderRadius: 22,
    backgroundColor: "rgba(34,34,34,0.29)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.13)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.17,
    shadowRadius: 24,
    elevation: Platform.OS === "android" ? 13 : 0,
  },
});
