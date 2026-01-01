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

  /* ===== زر المفاصلة الاحترافي ===== */
  bargainButton: {
    marginTop: 18,
    marginBottom: 12,
    backgroundColor: "#0A2540",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start", // يجعل النص بجانب الأيقونة بشكل احترافي
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  bargainIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1F3A5F",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },

  bargainTextContainer: {
    flex: 1,
    justifyContent: "center",
  },

  bargainButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  bargainButtonSub: {
    color: "#BFD7ED",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },
});

export default styles;
