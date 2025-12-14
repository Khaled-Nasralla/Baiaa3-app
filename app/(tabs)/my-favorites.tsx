import { FavoriteProduct, myFavorites } from "@/constants/myFavorites";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../(styles)/my-favorites-styles";

const screenWidth = Dimensions.get("window").width;

export default function MyFavorites() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* العنوان */}
        <Text style={styles.title}>المفضلة</Text>

        {/* شبكة المنتجات */}
        <View style={styles.grid}>
          {myFavorites.map((item: FavoriteProduct) => (
            <View key={item.id} style={styles.card}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.image} />
              )}
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
