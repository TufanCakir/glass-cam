import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(36,40,56,0.55)", // dunkler Glassy-Background
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerButton: {
    backgroundColor: "rgba(52,152,219,0.22)", // blauer Glass-Button
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 60,
    marginBottom: 22,
    ...Platform.select({
      ios: {
        shadowColor: "#3498db",
        shadowOpacity: 0.14,
        shadowRadius: 9,
        shadowOffset: { width: 0, height: 5 },
      },
      android: {
        elevation: 7,
      },
    }),
    borderWidth: 1,
    borderColor: "rgba(52,152,219,0.18)",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.1,
    textShadowColor: "rgba(0,0,0,0.12)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  selectedEmoji: {
    marginTop: 30,
    fontSize: 20,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.17)",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 24,
    textAlign: "center",
    fontWeight: "500",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 7,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    overflow: "hidden",
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(36,40,56,0.35)",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    marginTop: 50,
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.11,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -3 },
      },
      android: {
        elevation: 7,
      },
    }),
  },
});
