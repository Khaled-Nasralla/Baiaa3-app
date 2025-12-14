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
import myFavstyles from "../(styles)/my-favorites-styles";

const screenWidth = Dimensions.get("window").width;

export default function MyFavorites() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={myFavstyles.container}>

        {/* العنوان */}
        <Text style={myFavstyles.title}>المفضلة</Text>

        {/* شبكة المنتجات */}
        <View style={myFavstyles.grid}>
          {myFavorites.map((item: FavoriteProduct) => (
            <View key={item.id} style={myFavstyles.card}>
              {item.image && (
                <Image source={{ uri: item.image }} style={myFavstyles.image} />
              )}
              <Text style={myFavstyles.name}>{item.name}</Text>
              <Text style={myFavstyles.price}>{item.price}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
