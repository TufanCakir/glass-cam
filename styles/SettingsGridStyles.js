import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "rgba(32, 38, 57, 0.55)", // leichter dunkler Glass-Hintergrund
  },
  gridContent: {
    justifyContent: "center",
  },
  button: {
    flex: 1,
    margin: 7,
    minWidth: 96,
    minHeight: 96,
    maxWidth: 140,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.14)", // fallback falls Blur nicht sichtbar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 7,
    ...Platform.select({
      android: {
        borderWidth: 0.5,
        borderColor: "rgba(255,255,255,0.08)",
      },
    }),
  },
  iconWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  labelWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 4,
    gap: 4,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    letterSpacing: 0.1,
    textShadowColor: "rgba(0,0,0,0.16)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    textAlign: "center",
  },
  externalIcon: {
    marginLeft: 4,
    marginTop: 1,
    opacity: 0.8,
  },
});
