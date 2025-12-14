import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function FloatingButton() {
  return (
    <TouchableOpacity style={styles.floating} 
    onPress={
 () => router.push("/add-products-page") } >
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floating: {
    position: "absolute",
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,

    backgroundColor: "#04745bff",
    borderRadius: 30,

    alignItems: "center",
    justifyContent: "center",

    elevation: 10, // android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  plus: {
    color: "#fff",
    fontSize: 32,
    marginTop: -2,
  },
});
