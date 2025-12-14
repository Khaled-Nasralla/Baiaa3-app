import { StyleSheet } from "react-native";

 const styles = StyleSheet.create({
  bg: {
     flex: 1,
    },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#ffffffff",
  },
  inputStyles: {
    marginVertical: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
  },
  btnContainer: {
    marginTop: 20,
    alignItems: "center",
     backgroundColor: "#ffffffff",
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
});
export default styles;