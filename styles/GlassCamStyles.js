import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(30,34,40,0.96)", // fast schwarz, mit leichter Transparenz
    justifyContent: "flex-end",
  },

  camera: {
    flex: 1,
    borderRadius: 26,
    overflow: "hidden",
  },

  // Vorschau nach Aufnahme
  previewContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
    resizeMode: "cover",
  },
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20, 24, 32, 0.44)",
    borderRadius: 32,
  },
  previewText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "rgba(50,60,80,0.45)",
    borderRadius: 18,
    paddingHorizontal: 26,
    paddingVertical: 12,
    overflow: "hidden",
    textAlign: "center",
    letterSpacing: 0.5,
    marginTop: 16,
  },

  // Button-Zeile
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    gap: 44,
    zIndex: 3,
  },

  glassButton: {
    backgroundColor: "rgba(60, 64, 74, 0.44)",
    borderRadius: 60,
    padding: 20,
    marginHorizontal: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 14,
      },
      android: {
        elevation: 7,
      },
    }),
    borderWidth: 1,
    borderColor: "rgba(180,200,255,0.10)",
  },

  snapButton: {
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "rgba(33,132,255,0.32)",
  },

  // Tabs
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgba(32,36,46,0.73)",
    borderRadius: 22,
    margin: 8,
    padding: 4,
    gap: 6,
    zIndex: 4,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 14,
  },
  tabSelected: {
    backgroundColor: "rgba(255,255,255,0.17)",
    shadowColor: "#22A3F7",
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  tabText: {
    color: "#c8d0e0",
    fontSize: 17,
    fontWeight: "500",
    letterSpacing: 0.15,
  },
  tabTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Selector
  selectorBar: {
    marginTop: 0,
    marginBottom: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(30,34,40,0.35)",
    borderRadius: 24,
    minHeight: 90,
  },

  // Custom-Overlay für GlassCam
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(80,110,150,0.07)",
    zIndex: 0,
  },
  permissionText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 50, // Passe dies nach Bedarf an
  },
  cameraContainer: {
    flex: 1, // Stellt sicher, dass der Container den verfügbaren Platz einnimmt
  },
  horizontalSelectorContent: {
    height: 100,
    minHeight: 100,
    alignItems: "center", // Zentriert den Inhalt vertikal
    paddingHorizontal: 10, // Fügt etwas horizontalen Abstand hinzu
  },
  horizontalSelector: {
    maxHeight: 200,
  },
});
