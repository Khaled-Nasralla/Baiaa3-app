import React from "react";
import { ScrollView, Text, View } from "react-native";





export default function ProductDetails() {

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
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 5 }}>{}</Text>
        <Text style={{ fontSize: 20, color: "#1b8bff", marginBottom: 5 }}>${}</Text>
        <Text style={{ fontSize: 16, color: "#555", marginBottom: 10 }}>{}</Text>
        <Text style={{ fontSize: 16, color: "#333", lineHeight: 22 }}>{}</Text>

        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 14, color: "#888" }}>نشر بواسطة: {}</Text>
        </View>
      </View>
    </ScrollView>
  );
}