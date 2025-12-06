import { Image, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export function Template() {
  return (
    <ThemedView style={styles.card}>
      <Image
        source={require("../../assets/images/khaled.png")}
        style={styles.image}
      />

      <ThemedText style={styles.text}>المنتج :</ThemedText>
      <ThemedText style={styles.text}>السعر  :</ThemedText>
      <ThemedText style={styles.text}>المكان :</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",         // let parent place 2 per row
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    elevation: 3,         // shadow on Android
    shadowColor: "#000",  // shadow on iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },

  text: {
    fontSize: 14,
    marginTop: 3,
    left:120,
    color:"black"
  },
});
