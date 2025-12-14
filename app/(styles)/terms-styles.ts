import { StatusBar, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight || 25, // كل شيء تحت الستاتوس بار
  },
  backButton: {
    padding: 15,
    backgroundColor: "#007bff",
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "right",
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 25,
    textAlign: "right",
  },
});
export default styles;