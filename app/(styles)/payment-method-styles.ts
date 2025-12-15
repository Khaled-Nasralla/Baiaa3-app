import { StyleSheet } from "react-native";


 const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    marginBottom: 14,
  },

  activeCard: {
    borderColor: "#2F6BFF",
    backgroundColor: "#EEF3FF",
  },

  cardText: {
    fontSize: 16,
    fontWeight: "600",
  },

  noticeBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },

  noticeText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: "#1E3A8A",
  },

  bold: {
    fontWeight: "700",
    fontSize: 15,
  },

  button: {
    marginTop: 30,
    backgroundColor: "#2F6BFF",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});

export default styles;