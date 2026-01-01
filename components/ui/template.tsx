import { SimpleLineIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, TouchableOpacity } from "react-native";
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
  productName: prodcutName,
  price,
  provinceName,
  imageUrl,
  productUserId
}: TemplateProps) {
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
  const fullImageUrl = `${BASE_URL}${imageUrl}`;

  const slideAnim = useRef(new Animated.Value(0)).current;
  const isVisible = openMenuId === id;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  return (
    <ThemedView style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: fullImageUrl }} style={styles.image} />
      </TouchableOpacity>

      <ThemedView style={styles.cardDetails}>
        <ThemedView style={styles.textPostion}>
          <ThemedText style={styles.text}>{prodcutName}</ThemedText>
          <ThemedText style={styles.text}>{price} ليرة سورية</ThemedText>
          <ThemedText style={styles.text}>{provinceName}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.options}>
          <TouchableOpacity
           
            onPress={() =>
              setOpenMenuId(isVisible ? null : id)
            }
          >
            <SimpleLineIcons name="options-vertical" size={24} color="black" />
          </TouchableOpacity>

          {isVisible && (
            <Animated.View
              style={[
                styles.menu,
                {
                  opacity: slideAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [40, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <OptionMenu productUserId={productUserId}/>
            </Animated.View>
          )}
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
    flex: 1,
  },

  options: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    flex: 1,
    position: "relative",
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

