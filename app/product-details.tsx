import { useGetProducts } from "@/contexts/get-products-context/get-products-context-provider";
import { useFetchUser } from "@/hooks/fetch-user";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./(styles)/product-detailes-styles";

const screenWidth = Dimensions.get("window").width;

// ==============================
// params
// ==============================
type ProductDetailsParams = {
  views?: number;
  publisherId?: string;
  publisherName?: string;
  publisherAvatarUri?: string | null;
  memberSince?: string;
  addressDescription?: string;
  phoneNumber?: string;
};

type RouteProps = RouteProp<
  { ProductDetails: ProductDetailsParams },
  "ProductDetails"
>;

export default function ProductDetails() {
  // ==============================
  // state
  // ==============================
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportMessage, setReportMessage] = useState("");

  // ==============================
  // data
  // ==============================
  const { product } = useGetProducts();
  const {user} = useFetchUser(product?.userId);
  const route = useRoute<RouteProps>();
  const params = route.params || {};
  const BASE_URL = "https://dewayne-interrepellent-unpertinently.ngrok-free.dev/";



  // ==============================
  // check favorite
  // ==============================
  useEffect(() => {
    const checkFavorite = async () => {
      if (!product) return;

      const stored = await AsyncStorage.getItem("favorites");
      const favorites = stored ? JSON.parse(stored) : [];

      const exists = favorites.some(
        (p: any) => p.productId === product.productId
      );

      setIsFavorite(exists);
    };

    checkFavorite();
  }, [product]);

  // ==============================
  // actions
  // ==============================
  const toggleFavorite = async () => {
    if (!product) return;

    const stored = await AsyncStorage.getItem("favorites");
    let favorites = stored ? JSON.parse(stored) : [];

    if (isFavorite) {
      favorites = favorites.filter(
        (p: any) => p.productId !== product.productId
      );
    } else {
      favorites.push(product);
    }

    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const openImage = (img: any) => {
    setSelectedImage(img);
    setModalVisible(true);
  };

  const handleReport = (type: "post" | "account") => {
    setReportModalVisible(false);
    setReportMessage(
      type === "post"
        ? "تم تلقي البلاغ عن المنشور وسيتم التحقق منه ✅"
        : "تم تلقي البلاغ عن الحساب وسيتم التحقق منه ✅"
    );
    setTimeout(() => setReportMessage(""), 3000);
  };

  // ==============================
  // params defaults
  // ==============================
  const {
    views = 0,
    publisherId = "1",
    publisherName = "غير معروف",
    publisherAvatarUri = null,
    memberSince = "2024",
    addressDescription = "لم يتم إضافة وصف العنوان",
    phoneNumber = "غير متوفر",
  } = params;

  const STATUS_BAR_HEIGHT =
    Platform.OS === "android" ? StatusBar.currentHeight || 25 : 0;

  // ==============================
  // render
  // ==============================
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingTop: STATUS_BAR_HEIGHT + 20,
        }}
      >
        {/* الصور */}
        <View style={styles.imagesWrapper}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {product?.imageList.map((img, index) => (
              <TouchableOpacity key={index} onPress={() => openImage(img)}>
                <Image
                  source={{ uri: `${BASE_URL}${img.imageUrl}` }}
                  style={styles.productImage}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* ❤️ مفضلة */}
          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={26}
              color="#ff0000ff"
            />
          </TouchableOpacity>
        </View>

        {/* التفاصيل */}
        <View style={styles.detailsBox}>
          <Text style={styles.productName}>{product?.productName}</Text>
          <Text style={styles.price}>{product?.price}ل.س  </Text>
          <Text style={styles.sectionTitle}>الوصف</Text>
          <Text style={styles.description}>{product?.description}</Text>
          
          <Text style={styles.sectionTitle}>المنطقة و وصف العنوان</Text>
          <Text style={styles.location}>{product?.province.provinceName}</Text>
          <Text style={styles.description}>{product?.addressDescription}</Text>

          <Text style={styles.sectionTitle}>التواصل</Text>

          <Text style={styles.phone}>
           {product?.contact}
          </Text>
  <Text style={styles.postedTime}>{product?.createdAt}</Text>
          <Text style={styles.views}>{views} مشاهدة</Text>

          {/* البائع */}
          <View style={styles.sellerContainer}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/my-profile",
                  params: { userId: publisherId, isOwner: "false" },
                })
              }
            >
              {user?.profileImage ? (
                <Image source={{ uri: `${BASE_URL}${user?.profileImage}` }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder} />
              )}
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <View style={styles.sellerHeader}>
                <Text style={styles.sellerName}>{`${user?.name ?? ""} ${user?.surName ?? ""}`}</Text>
                <TouchableOpacity
                  onPress={() => setReportModalVisible(true)}
                  style={styles.reportBtn}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>⚠️</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.memberSince}>عضو منذ {user?.createdAt}</Text>
            </View>
          </View>
        </View>

        {/* تكبير الصورة */}
        <Modal visible={modalVisible} transparent>
          <View style={styles.modalContainer}>
            <ScrollView
              maximumZoomScale={5}
              minimumZoomScale={1}
              contentContainerStyle={styles.modalContent}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => setModalVisible(false)}
              >
                <Image
                  source={{ uri: `${BASE_URL}${selectedImage?.imageUrl}` }}
                  style={styles.modalImage}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>

        {/* البلاغ */}
        <Modal visible={reportModalVisible} transparent animationType="fade">
          <View style={styles.reportModalOverlay}>
            <View style={styles.reportModalContent}>
              <Text style={styles.reportTitle}>اختر نوع البلاغ</Text>

              <TouchableOpacity
                style={styles.reportOption}
                onPress={() => handleReport("post")}
              >
                <Text style={styles.reportOptionText}>
                  إبلاغ عن منشور ينتهك الشروط
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.reportOption}
                onPress={() => handleReport("account")}
              >
                <Text style={styles.reportOptionText}>
                  إبلاغ عن حساب ينتهك الشروط
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {reportMessage ? (
          <View style={styles.reportMessage}>
            <Text style={{ color: "#fff" }}>{reportMessage}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
