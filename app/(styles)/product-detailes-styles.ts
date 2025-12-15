import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth } = Dimensions.get('window');

 const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f6" },

  imagesScroll: { width: screenWidth, height: 280, backgroundColor: "#eee" },
  productImage: { width: screenWidth, height: 280, resizeMode: "cover" },

  detailsBox: {
    padding: 20,
    backgroundColor: "#fff",
    marginTop: -20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  productName: { fontSize: 26, fontWeight: "bold", textAlign: "right", writingDirection: "rtl" },
  price: { fontSize: 24, marginTop: 10, fontWeight: "bold", color: "red", textAlign: "right", writingDirection: "rtl" },
  location: { fontSize: 16, color: "#666", marginTop: 5, textAlign: "right", writingDirection: "rtl" },
  postedTime: { fontSize: 16, color: "#444", textAlign: "right", writingDirection: "rtl" },
  sectionTitle: { marginTop: 20, fontSize: 18, fontWeight: "bold", textAlign: "right", writingDirection: "rtl" },
  description: { fontSize: 16, color: "#333", marginTop: 8, lineHeight: 24, textAlign: "right", writingDirection: "rtl" },
  views: { fontSize: 14, color: "#777", marginTop: 15, textAlign: "right", writingDirection: "rtl" },

  sellerContainer: { flexDirection: "row-reverse", alignItems: "center", marginTop: 25 },
  avatar: { width: 55, height: 55, borderRadius: 30, marginLeft: 10 },
  avatarPlaceholder: { width: 55, height: 55, borderRadius: 30, backgroundColor: "#ccc", marginLeft: 10 },
  sellerHeader: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" },
  sellerName: { fontSize: 17, fontWeight: "bold", writingDirection: "rtl" },
  memberSince: { fontSize: 14, color: "#777", writingDirection: "rtl" },

  reportBtn: { backgroundColor: "red", borderRadius: 5, paddingHorizontal: 6, paddingVertical: 2, marginLeft: 10 },

  modalContainer: { flex: 1, backgroundColor: "black" },
  modalContent: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalImage: { width: screenWidth, height: 280, resizeMode: "contain" },

  // ---------- Styles البلاغ ----------
  reportModalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  
  reportModalContent: { width: "80%", backgroundColor: "#fff", borderRadius: 10, padding: 20, alignItems: "center" },
  reportTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, writingDirection: "rtl" },
  reportOption: { width: "100%", paddingVertical: 12, paddingHorizontal: 10, backgroundColor: "#e33", borderRadius: 8, marginBottom: 10 },
  reportOptionText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  reportMessage: { position: "absolute", bottom: 30, left: 20, right: 20, backgroundColor: "#444", padding: 12, borderRadius: 8, zIndex: 10 },
phone: {
  fontSize: 15,
  color: "#333",
  marginTop: 6,
},

imagesWrapper: {
  position: "relative",
},

favoriteButton: {
  position: "absolute",
  top: 12,
  right: 12,
  backgroundColor: "rgba(0,0,0,0.6)",
  padding: 8,
  borderRadius: 20,
},


});

export default styles;
