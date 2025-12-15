import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  overlay: {
    flex: 1,
    justifyContent: "space-between",
  },

  header: {
    marginTop: 20,
    alignItems: "center",
    gap: 10,
  },

  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  frame: {
    alignSelf: "center",
    width: "85%",
    height: 220,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 16,
    marginTop: 40,
  },

  selfieFrame: {
    width: 240,
    height: 240,
    borderRadius: 120,
  },

  preview: {
    width: 120,
    height: 80,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },

  bottom: {
    alignItems: "center",
    marginBottom: 40,
  },

  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  innerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  permissionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },

  permissionButton: {
    backgroundColor: "#2F6BFF",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
  },

  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
