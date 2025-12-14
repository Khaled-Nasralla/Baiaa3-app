import { StyleSheet } from "react-native";
 const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    padding: 15,
    paddingBottom: 40, // مساحة أسفل الشاشة
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    writingDirection: "rtl",
  },

  emptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 50,
  },

  productCard: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
  },

  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#ccc",
    marginLeft: 10,
  },

  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#888",
  },

  productInfo: {
    flex: 1,
  },

  productName: {
    fontSize: 16,
    fontWeight: "bold",
    writingDirection: "rtl",
  },

  productPrice: {
    fontSize: 14,
    color: "red",
    marginTop: 3,
    writingDirection: "rtl",
  },

  notificationText: {
    fontSize: 12,
    color: "#555",
    marginTop: 2,
    writingDirection: "rtl",
  },
});
export default styles;
