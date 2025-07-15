import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "rgba(36,40,56,0.19)", // glassiger Layer
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    minHeight: 68,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(60, 64, 74, 0.16)", // glasig
    borderRadius: 18,
    paddingVertical: 10,
    bottom: 25,
    paddingHorizontal: 18,
    marginHorizontal: 2,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.11,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 7,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  icon: {
    marginRight: 8,
    opacity: 0.94,
  },
  text: {
    color: "#cbe0fc",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.13,
    textShadowColor: "rgba(0,0,0,0.09)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  textActive: {
    color: "#fff",
    fontWeight: "bold",
    textShadowColor: "rgba(32,152,255,0.24)",
    textShadowRadius: 6,
  },
});
