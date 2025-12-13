import { FavoriteProduct, myFavorites } from "@/constants/myFavorites";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../(styles)/notifications";

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
