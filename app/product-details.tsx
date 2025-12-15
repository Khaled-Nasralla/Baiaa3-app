import { useGetProducts } from "@/contexts/get-products-context/get-products-context-provider";
import { useFetchUser } from "@/hooks/fetch-user";
import { RouteProp, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useState } from "react";
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
// 1️⃣ تعريف نوع الـ params
// ==============================
type ProductDetailsParams = {
  productName?: string;
  price?: string;
  location?: string;
  postedTime?: string;
  description?: string;
  views?: number;
  publisherId?: string; // معرف البائع
  publisherName?: string;
  publisherAvatarUri?: string | null;
  memberSince?: string;
  addressDescription?: string;   // وصف العنوان
  phoneNumber?: string;          // رقم الهاتف
};

type RouteProps = RouteProp<{ ProductDetails: ProductDetailsParams }, "ProductDetails">;

// ==============================
// 2️⃣ المكون الرئيسي
// ==============================
export default function ProductDetails() {
  const route = useRoute<RouteProps>();
  const params = route.params || {};
  const BASE_URL = "https://dewayne-interrepellent-unpertinently.ngrok-free.dev";
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportMessage, setReportMessage] = useState("");

  const {product} = useGetProducts();
  const {user} = useFetchUser(product?.userId);

  const openImage = (img: any) => {
    setSelectedImage(img);
    setModalVisible(true);
  };

  const handleReport = (type: "post" | "account") => {
    setReportModalVisible(false);
    const msg =
      type === "post"
        ? "تم تلقي البلاغ عن المنشور وسيتم التحقق منه ✅"
        : "تم تلقي البلاغ عن الحساب وسيتم التحقق منه ✅";
    setReportMessage(msg);
    setTimeout(() => setReportMessage(""), 3000); // تختفي بعد 3 ثواني
  };

  const {
    views = 0,
    publisherId = "1",
    publisherName = user?.name,
    publisherAvatarUri = null,
    memberSince = "2024",
  addressDescription = "لم يتم إضافة وصف العنوان",
  phoneNumber = "غير متوفر",
  } = params;


  const STATUS_BAR_HEIGHT = Platform.OS === "android" ? StatusBar.currentHeight || 25 : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: STATUS_BAR_HEIGHT + 20 }}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >

        {/* ---------- معرض الصور ---------- */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imagesScroll}
        >
          { product?.imageList.map((img, index) => (
            <TouchableOpacity key={index} onPress={() => openImage(img.imageUrl)}>
             <Image source={{ uri: `${BASE_URL}${img.imageUrl}` }} style={styles.productImage} />
            </TouchableOpacity> ))} 
        </ScrollView>


          
          <View style={styles.detailsBox}>
          <Text style={styles.productName}>{product?.productName}</Text>
          <Text style={styles.price}>{product?.price}</Text>
          <Text style={styles.location}>{product?.province.provinceName}</Text>
          <Text style={styles.postedTime}>{product?.createdAt}</Text>

          <Text style={styles.sectionTitle}>الوصف</Text>
          
          <Text style={styles.description}>{product?.description}</Text>
          <Text style={styles.sectionTitle}>المنطقة و وصف العنوان</Text>

          <Text style={styles.description}>
          {product?.addressDescription}
          </Text>


          <Text style={styles.sectionTitle}>التواصل</Text>

          <Text style={styles.phone}>
           {product?.contact}
          </Text>

          <Text style={styles.views}>{views} مشاهدة</Text>

          {/* ---------- معلومات البائع + زر الإبلاغ ---------- */}
          <View style={styles.sellerContainer}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/my-profile",
                  params: { userId: publisherId, isOwner: "false" },
                })
              }>
              {publisherAvatarUri ? (
                <Image source={{ uri: publisherAvatarUri }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder} />
              )}
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <View style={styles.sellerHeader}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/my-profile",


                      params: { userId: publisherId, isOwner: "false" },
                    })
                  }
                >
                  <Text style={styles.sellerName}>{`${user?.name ?? ""} ${user?.surName ?? ""}`}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setReportModalVisible(true)}
                  style={styles.reportBtn}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>⚠️</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.memberSince}>عضو منذ {memberSince}</Text>
            </View>
          </View>
        </View>

        {/* ---------- Modal لتكبير الصورة ---------- */}
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <ScrollView
              maximumZoomScale={5}
              minimumZoomScale={1}
              contentContainerStyle={styles.modalContent}
            >
              <TouchableOpacity style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
                <Image source={{ uri: `${BASE_URL}${selectedImage}` }} style={styles.modalImage} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>

        {/* ---------- Modal البلاغ ---------- */}
        <Modal visible={reportModalVisible} transparent animationType="fade">
          <View style={styles.reportModalOverlay}>
            <View style={styles.reportModalContent}>
              <Text style={styles.reportTitle}>اختر نوع البلاغ</Text>

              <TouchableOpacity
                style={styles.reportOption}
                onPress={() => handleReport("post")}
              >
                <Text style={styles.reportOptionText}>إبلاغ عن منشور ينتهك الشروط</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.reportOption}
                onPress={() => handleReport("account")}
              >
                <Text style={styles.reportOptionText}>إبلاغ عن حساب ينتهك الشروط</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.reportOption, { backgroundColor: "#ccc" }]}
                onPress={() => setReportModalVisible(false)}
              >
                <Text style={styles.reportOptionText}>إلغاء</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* ---------- رسالة البلاغ ---------- */}
        {reportMessage ? (
          <View style={styles.reportMessage}>
            <Text style={{ color: "#fff", textAlign: "center" }}>{reportMessage}</Text>
          </View>
        ) : null}

      </ScrollView>
    </SafeAreaView>
  );
}

