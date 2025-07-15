import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(36,40,56,0.55)", // dunkler Glass-Hintergrund
    paddingTop: 36,
    paddingHorizontal: 0,
  },
  input: {
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.19)",
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.09,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  addButton: {
    backgroundColor: "rgba(52,152,219,0.25)",
    marginHorizontal: 20,
    marginBottom: 18,
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 12,
    shadowColor: "#3498db",
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.15,
    textShadowColor: "rgba(0,0,0,0.13)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  listContainer: {
    paddingBottom: 80,
    paddingTop: 8,
    paddingHorizontal: 10,
    flexGrow: 1,
  },
});
