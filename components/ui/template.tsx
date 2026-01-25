import { SimpleLineIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AnimatedMenu } from "../animated-menu";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { OptionMenu } from "./menu";

type TemplateProps = {
  id: string;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  onPress: () => void;
  productName: string | null;
  price: string | null;
  provinceName: string | null;
  imageUrl: string | null;
  productUserId: string;
};

export function Template({
  id,
  openMenuId,
  setOpenMenuId,
  onPress,
  productName,
  price,
  provinceName,
  imageUrl,
  productUserId,
}: TemplateProps) {
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
  const fullImageUrl = `${BASE_URL}${imageUrl}`;


  useFocusEffect(() => {
    return () => {
      setOpenMenuId(null);
    };
  });


  const isVisible = openMenuId === id;

  return (
    <>
      {/* 🔹 Overlay to detect outside clicks */}
      {isVisible && (
        <Pressable
          style={styles.overlay}
          onPress={() => setOpenMenuId(null)}
        />
      )}

      <ThemedView style={styles.card}>
        <TouchableOpacity onPress={onPress}>
          <Image source={{ uri: fullImageUrl }} style={styles.image} />
        </TouchableOpacity>

        <ThemedView style={styles.cardDetails}>
          <ThemedView style={styles.textPostion}>
            <ThemedText style={styles.text}>{productName}</ThemedText>
            <ThemedText style={styles.text}>{price} ليرة سورية</ThemedText>
            <ThemedText style={styles.text}>{provinceName}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.options}>
            {/* ✅ Options button */}
            <TouchableOpacity
              onPress={() => setOpenMenuId(isVisible ? null : id)}
            >
              <SimpleLineIcons name="options-vertical" size={24} color="black" />
            </TouchableOpacity>

            {/* ✅ Menu itself (clicking here won't close it) */}
            {isVisible && (
              <Pressable onPress={() => { }}>
                <AnimatedMenu isActive={isVisible}>
                  <OptionMenu productId= {id}
                  productUserId={productUserId}
                  onClose={() => setOpenMenuId(null)} 
                  />
                </AnimatedMenu>
              </Pressable>
            )}
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </>
  );
}



const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    elevation: 3,
    zIndex: 2,
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
    height: 90,
  },

  textPostion: {
    alignItems: "flex-end",

  },

  options: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    flex: 1,
    position: "relative",
     zIndex: 3,
  },

  menu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    elevation: 6,
    zIndex: 100,
    minWidth: 120,
  },
});

