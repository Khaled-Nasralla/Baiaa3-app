import { Template } from "@/components/ui/template";
import { useSignInContext } from "@/contexts/sign-in-context/sign-in-context-provider";
import { useFetchLikedProducts } from "@/hooks/fetch-Liked-products";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import myFavstyles from "../(styles)/my-favorites-styles";


export default function MyFavorites() {

  const { user } = useSignInContext();
  const { likedProducts } = useFetchLikedProducts(user?.id);
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
  const onPress = async (prodcutId: any) => {
    router.push("/product-details");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={myFavstyles.container}>
        {/* العنوان */}
        <Text style={myFavstyles.title}>المفضلة</Text>

        {/* المحتوى */}
        {likedProducts.data?.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            لا يوجد منتجات في المفضلة
          </Text>
        ) : (
          <View style={myFavstyles.grid}>
            {likedProducts.data?.map((item, index) => (
              <Template
                key={item.productId}
                onPress={() => onPress(item.productId)}
                price={item.price}
                prodcutName={item.productName}
                provinceName={item.provinceName}
                imageUrl={item.imageUrl}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
