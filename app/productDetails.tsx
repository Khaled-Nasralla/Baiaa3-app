import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";

const { width } = Dimensions.get("window");

// نوع بيانات المنتج
type Product = {
  name: string;
  price: number;
  location: string;
  description: string;
  ownerName: string;
  images: { uri: string }[];
};

// نوع Props للصفحة
type ProductDetailsProps = {
  route: { params: { product: Product } };
  navigation: any;
};

export default function ProductDetails({ route }: ProductDetailsProps) {
  const { product } = route.params;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* صور المنتج /}
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={{ width, height: 300 }}>
        {product.images.map((img, index) => (
          <TouchableOpacity key={index} onPress={() => console.log("تكبير الصورة")}>
            <Image source={{ uri: img.uri }} style={{ width, height: 300, resizeMode: "cover" }} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/ معلومات المنتج */}
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 5 }}>{product.name}</Text>
        <Text style={{ fontSize: 20, color: "#1b8bff", marginBottom: 5 }}>${product.price}</Text>
        <Text style={{ fontSize: 16, color: "#555", marginBottom: 10 }}>{product.location}</Text>
        <Text style={{ fontSize: 16, color: "#333", lineHeight: 22 }}>{product.description}</Text>

        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 14, color: "#888" }}>نشر بواسطة: {product.ownerName}</Text>
        </View>
      </View>
    </ScrollView>
  );
}