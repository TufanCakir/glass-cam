import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  gridContainer: {
    flex: 1,
    backgroundColor: "rgba(32,38,57,0.44)", // milchiger Grundton, wirkt auch mit Blur
  },
  gridContent: {
    justifyContent: "center",
  },
  topRightButton: {
    position: "absolute",
    top: 12,
    right: 18,
    zIndex: 10,
    backgroundColor: "rgba(40,40,60,0.32)",
    borderRadius: 18,
    padding: 5,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.16,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  menuItem: {
    flex: 1,
    top: 50,
    margin: 9,
    minWidth: 96,
    minHeight: 96,
    maxWidth: 144,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.18)", // fallback, falls Blur nicht angezeigt wird
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.14,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  iconWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 8,
  },
  label: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    letterSpacing: 0.2,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.17)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // Modal (glass)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(24,26,38,0.46)", // dunkler Frost-Overlay
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 28,
    overflow: "hidden",
    padding: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    letterSpacing: 0.2,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.17)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  modalText: {
    fontSize: 16,
    color: "#f2f2f2",
    marginBottom: 24,
    lineHeight: 22,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 4,
    backgroundColor: "rgba(52,152,219,0.21)",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 28,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
