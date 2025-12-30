import { SimpleLineIcons } from '@expo/vector-icons';
import { useState } from 'react';
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
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

  const fullImageUrl = `${BASE_URL}${imageUrl}`;
  const [visible, setVisible] = useState(false);
  return (
    <ThemedView style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: fullImageUrl }}
          style={styles.image}
        />
      </TouchableOpacity>
      <ThemedView style={styles.cardDetails}>
        <ThemedView style={styles.textPostion}>
          <ThemedText style={styles.text}>{prodcutName}</ThemedText>
          <ThemedText style={styles.text}>{price} ليرة سورية</ThemedText>
          <ThemedText style={styles.text}>{provinceName}</ThemedText>
        </ThemedView>
        <ThemedView >
          <ThemedView style={styles.options}>
          
                <TouchableOpacity onPress={() => setVisible(true)}>
                  <SimpleLineIcons name="options-vertical" size={24} color="black" />
                </TouchableOpacity>
     
          </ThemedView>

        </ThemedView>
      </ThemedView>


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
  cardDetails: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    height: 90,                 // 👈 important: gives vertical space
  },

  textPostion: {
    alignItems: "flex-end",     // right aligned text
    justifyContent: "flex-start",
    flex: 1,
  },

  options: {
    alignItems: "flex-start",   // left aligned
    justifyContent: "flex-end", // 👈 push to bottom
    flex: 1,
  },
});
