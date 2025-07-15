import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(36,40,56,0.55)", // Glassy dunkler Hintergrund
  },
  inner: {
    flex: 1,
    margin: 0,
    paddingHorizontal: 0,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.2,
    textAlign: "center",
    marginTop: 32,
    marginBottom: 16,
    textShadowColor: "rgba(0,0,0,0.12)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 24,
    marginBottom: 8,
    marginTop: 6,
    fontWeight: "600",
    opacity: 0.87,
    letterSpacing: 0.08,
  },
  editorWrapper: {
    backgroundColor: "rgba(255,255,255,0.17)",
    borderRadius: 22,
    marginHorizontal: 18,
    paddingTop: 6,
    marginBottom: 18,
    maxHeight: 390,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.13,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
      },
      android: {
        elevation: 9,
      },
    }),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  editor: {
    minHeight: 210,
    fontSize: 17,
    color: "#fff",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderRadius: 18,
    textAlignVertical: "top",
    backgroundColor: "transparent", // Hintergrund kommt von editorWrapper!
    fontWeight: "500",
    letterSpacing: 0.05,
  },
  footerWrapper: {
    backgroundColor: "rgba(36,40,56,0.37)",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingBottom: 0,
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
