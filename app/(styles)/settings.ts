import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },

  logoContainer: { alignItems: "center", marginTop: 20, marginBottom: 15 },
  logo: { width: 140, height: 140, resizeMode: "contain" },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },

  subscriptionCard: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginTop: 10,
  },
  subscriptionLabel: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
  },

  optionButton: {
    backgroundColor: "#f5f5f5",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  optionText: {
    flex: 1,
    textAlign: "right",
    fontSize: 15,
    marginRight: 10,
    color: "#333",
  },

  section: { marginVertical: 15 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },

  logoutBtn: {
    marginVertical: 30,
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 6,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },

  subscriptionOption: { marginBottom: 20 },
  subscriptionTitle: { fontSize: 16, fontWeight: "bold" },
  subscriptionDesc: { color: "#555", marginTop: 4 },

  modalClose: { marginTop: 10 },
  cancelText: { color: "red", textAlign: "center", fontWeight: "bold" },

  userMessageInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 100,
    padding: 10,
    marginVertical: 10,
    textAlignVertical: "top",
  },

  sendButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  sendButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  inputLabel: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
});
