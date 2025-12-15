import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import myFavstyles from "../(styles)/my-favorites-styles";

const screenWidth = Dimensions.get("window").width;

export default function MyFavorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  // 🔹 تحميل المفضلة عند فتح الصفحة
  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        const stored = await AsyncStorage.getItem("favorites");
        const list = stored ? JSON.parse(stored) : [];
        setFavorites(list);
      };

      loadFavorites();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={myFavstyles.container}>
        {/* العنوان */}
        <Text style={myFavstyles.title}>المفضلة</Text>

        {/* المحتوى */}
        {favorites.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            لا يوجد منتجات في المفضلة
          </Text>
        ) : (
          <View style={myFavstyles.grid}>
            {favorites.map((item, index) => (
              <View key={item.productId ?? index} style={myFavstyles.card}>
                {item.imageList?.[0]?.imageUrl && (
                  <Image
                    source={{ uri: item.imageList[0].imageUrl }}
                    style={myFavstyles.image}
                  />
                )}
                <Text style={myFavstyles.name}>{item.productName}</Text>
                <Text style={myFavstyles.price}>{item.price}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
