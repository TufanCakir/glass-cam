import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  scrollWrapper: {
    height: Dimensions.get("window").height * 0.52,
    overflow: "hidden",
  },
  entriesContainer: {
    paddingBottom: 18,
    paddingTop: 4,
    paddingHorizontal: 2,
  },
  entryBlock: {
    marginBottom: 24,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.21)",
    borderWidth: 1.2,
    borderColor: "rgba(255,255,255,0.33)",
    padding: 12,
  },
  entryLabel: {
    fontSize: 15,
    marginBottom: 6,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.08,
  },
  textInput: {
    borderWidth: 1.2,
    borderColor: "rgba(255,255,255,0.38)",
    borderRadius: 10,
    padding: 12,
    minHeight: 110,
    textAlignVertical: "top",
    backgroundColor: "rgba(255,255,255,0.35)",
    color: "#fff",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 8,
  },
  addBtn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
    marginTop: 8,
    borderWidth: 1.3,
    borderColor: "rgba(255,255,255,0.37)",
  },
  deleteBtn: {
    marginLeft: 10,
    backgroundColor: "rgba(255, 60, 60, 0.25)",
    borderColor: "rgba(255,60,60,0.24)",
    shadowColor: "#f54a4a",
  },
  addBtnText: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 0.1,
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 10,
  },
});
