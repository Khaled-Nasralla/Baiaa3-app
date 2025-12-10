import { FavoriteProduct, myFavorites } from "@/constants/myFavorites";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 40, // مساحة أسفل الشاشة لتجنب شريط الهاتف
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "right",
    writingDirection: "rtl",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: (screenWidth - 50) / 2, // حساب العرض مع مسافة بسيطة بين البطاقات
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    writingDirection: "rtl",
  },
  price: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
    textAlign: "center",
    writingDirection: "rtl",
  },
});
