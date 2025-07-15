import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  note: {
    minHeight: 60,
    marginVertical: 8,
    marginHorizontal: 6,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)", // Glass-Effekt (mit/ohne Blur)
    padding: 16,
    paddingBottom: 12,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        shadowOffset: { width: 0, height: 2 },
      },
    }),
  },
  noteText: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 0.08,
    fontWeight: "500",
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.10)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  noteButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  editButton: {
    color: "#3498db",
    fontWeight: "bold",
    fontSize: 15,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: "rgba(52,152,219,0.13)",
    overflow: "hidden",
  },
  deleteButton: {
    color: "#e74c3c",
    fontWeight: "bold",
    fontSize: 15,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: "rgba(231,76,60,0.11)",
    overflow: "hidden",
    marginLeft: 4,
  },
});
