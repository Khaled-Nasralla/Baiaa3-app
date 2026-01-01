import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // خلفية الصفحة
  bg: {
    flex: 1,
  },

  // SafeArea
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // حاوية النموذج
  container: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  // حقول الإدخال
  inputStyles: {
    marginVertical: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
  },

  // زر التسجيل
  btnContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  btnStyle: {
    borderRadius: 10,
    backgroundColor: "#6BC7F5",
    width: "50%",
    padding: 12,
    alignItems: "center",
  },
  textBtn: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },

  // صف التحقق من الهوية
  verifyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },

  // زر التحقق الاحترافي
  verifyBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 250,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  verifyBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // أيقونة تحقق بجانب الزر
  verifiedIcon: {
    fontSize: 20,
    color: "green",
    marginLeft: 10,
  },
});

export default styles;
