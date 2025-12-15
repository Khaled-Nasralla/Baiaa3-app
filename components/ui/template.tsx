import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

type TemplateProps = {
  onPress: () => void;
  prodcutName: string | null,
  price: string | null,
  provinceName: string | null,
  imageUrl: string | null
};

export function Template({ onPress, prodcutName, price, provinceName, imageUrl }: TemplateProps) {
  const BASE_URL = "https://dewayne-interrepellent-unpertinently.ngrok-free.dev";

  const fullImageUrl = `${BASE_URL}${imageUrl}`;

  return (
    <ThemedView style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: fullImageUrl }}
          style={styles.image}
        />

        <ThemedView style={styles.textPostion}>
          <ThemedText style={styles.text}>اسم المنتج: {prodcutName}</ThemedText>
          <ThemedText style={styles.text}>السعر: {price}</ThemedText>
          <ThemedText style={styles.text}>المكان: {provinceName}</ThemedText>
        </ThemedView>


      </TouchableOpacity>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
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
    color: "black",

  },
  textPostion: {
    alignItems: "flex-end"
  }
});
