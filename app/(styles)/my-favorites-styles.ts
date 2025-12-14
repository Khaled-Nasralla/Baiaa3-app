import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth } = Dimensions.get('window');

 const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 40, // مساحة أسفل الشاشة لتجنب شريط الهاتف
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "right",
    writingDirection: "rtl",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: (screenWidth - 50) / 2, // حساب العرض مع مسافة بسيطة بين البطاقات
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    writingDirection: "rtl",
  },
  price: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
    textAlign: "center",
    writingDirection: "rtl",
  },
});

export default styles;
