import { StyleSheet } from "react-native";

 const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 15,
    paddingBottom: 40, // مساحة أسفل الصفحة
  },

  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 20,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ccc",
  },

  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#888",
  },

  headerInfo: {
    flex: 1,
    marginRight: 15,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    writingDirection: "rtl",
  },

  nameInput: {
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 2,
  },

  memberSince: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },

  contactSection: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    writingDirection: "rtl",
  },

  contactInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    textAlign: "right",
    writingDirection: "rtl",
  },

  contactText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },

  productsSection: {
    marginBottom: 30,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

});

export default styles;