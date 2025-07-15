import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000", // fallback
  },
  container: {
    backgroundColor: "rgba(255,255,255,0.20)", // halbtransparentes "Glas"
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    margin: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.20)", // halbtransparentes "Glas"
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  iconsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.20)", // halbtransparentes "Glas"
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    margin: 4,
  },
  iconSelected: {
    backgroundColor: "rgba(255,255,255,0.20)", // halbtransparentes "Glas"
    borderColor: "rgba(255,255,255,0.20)", // halbtransparentes "Glas"
  },
  preview: {
    alignItems: "center",
    marginVertical: 20,
  },
  previewLabel: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  previewName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginTop: 8,
  },
  saveBtn: {
    backgroundColor: "rgba(255,255,255,0.20)", // halbtransparentes "Glas"
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginTop: 8,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
