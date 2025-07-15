import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "85%",
    minHeight: 260,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 34,
    paddingHorizontal: 22,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: 26,
    borderWidth: 1.8,
    borderColor: "rgba(255,255,255,0.38)",
    overflow: "hidden",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.2,
    marginBottom: 32,
  },
  button: {
    marginTop: 12,
    minWidth: 120,
    paddingVertical: 12,
    paddingHorizontal: 38,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.38)",
    borderWidth: 1.2,
    borderColor: "rgba(255,255,255,0.55)",
  },
  buttonText: {
    fontSize: 19,
    color: "#fff",
    letterSpacing: 0.12,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 36,
    alignItems: "center",
    left: 0,
    right: 0,
  },
  versionText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  copyrightText: {
    fontSize: 13,
    color: "#fff",
    marginTop: 2,
    textAlign: "center",
  },
});
