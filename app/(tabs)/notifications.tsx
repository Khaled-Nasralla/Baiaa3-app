import { FavoriteProduct, myFavorites } from "@/constants/myFavorites";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsScreen() {

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>الإشعارات</Text>

        {myFavorites.length === 0 ? (
          <Text style={styles.emptyText}>لا توجد منتجات في المفضلة بعد.</Text>
        ) : (
          myFavorites.map((product: FavoriteProduct) => (
            <View key={product.id} style={styles.productCard}>
              {product.image ? (
                <Image source={{ uri: product.image }} style={styles.productImage} />
              ) : (
                <View style={[styles.productImage, styles.placeholder]}>
                  <Text style={{ color: "#fff" }}>صورة</Text>
                </View>
              )}

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <Text style={styles.notificationText}>
                  هذا المنتج في قسم المفضلة لديك.
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ==============================
// Styles
// ==============================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    padding: 15,
    paddingBottom: 40, // مساحة أسفل الشاشة
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    writingDirection: "rtl",
  },

  emptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 50,
  },

  productCard: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
  },

  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#ccc",
    marginLeft: 10,
  },

  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#888",
  },

  productInfo: {
    flex: 1,
  },

  productName: {
    fontSize: 16,
    fontWeight: "bold",
    writingDirection: "rtl",
  },

  productPrice: {
    fontSize: 14,
    color: "red",
    marginTop: 3,
    writingDirection: "rtl",
  },

  notificationText: {
    fontSize: 12,
    color: "#555",
    marginTop: 2,
    writingDirection: "rtl",
  },
});
