import { images } from "@/constants/images";
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
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
};

type RouteProps = RouteProp<{ ProductDetails: ProductDetailsParams }, "ProductDetails">;

// ==============================
// 2️⃣ المكون الرئيسي
// ==============================
export default function ProductDetails() {
  const route = useRoute<RouteProps>();
  const params = route.params || {};

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportMessage, setReportMessage] = useState("");

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
    productName = "اسم المنتج هنا",
    price = "150 يورو",
    location = "برلين، ألمانيا",
    postedTime = "منذ ساعتين",
    description = "الوصف الإجباري",
    views = 0,
    publisherId = "1",
    publisherName = "Hesham Alhajj",
    publisherAvatarUri = null,
    memberSince = "2024",
  } = params;

  const productImages = [
    images.clothes,
    images.electric,
    images.jobs,
    images.makeUp,
  ];

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
          {productImages.map((img, index) => (
            <TouchableOpacity key={index} onPress={() => openImage(img)}>
              <Image source={img} style={styles.productImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ---------- تفاصيل المنتج ---------- */}
        <View style={styles.detailsBox}>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.postedTime}>{postedTime}</Text>

          <Text style={styles.sectionTitle}>الوصف</Text>
          <Text style={styles.description}>{description}</Text>

          <Text style={styles.views}>{views} مشاهدة</Text>

          {/* ---------- معلومات البائع + زر الإبلاغ ---------- */}
          <View style={styles.sellerContainer}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/myprofile",
                  params: { userId: publisherId, isOwner: "false" },
                })
              }
            >
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
                      pathname: "/(tabs)/myprofile",
                      params: { userId: publisherId, isOwner: "false" },
                    })
                  }
                >
                  <Text style={styles.sellerName}>{publisherName}</Text>
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
                <Image source={selectedImage} style={styles.modalImage} />
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

// ==============================
// 3️⃣ Styles
// ==============================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f6" },

  imagesScroll: { width: screenWidth, height: 280, backgroundColor: "#eee" },
  productImage: { width: screenWidth, height: 280, resizeMode: "cover" },

  detailsBox: {
    padding: 20,
    backgroundColor: "#fff",
    marginTop: -20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  productName: { fontSize: 26, fontWeight: "bold", textAlign: "right", writingDirection: "rtl" },
  price: { fontSize: 24, marginTop: 10, fontWeight: "bold", color: "red", textAlign: "right", writingDirection: "rtl" },
  location: { fontSize: 16, color: "#666", marginTop: 5, textAlign: "right", writingDirection: "rtl" },
  postedTime: { fontSize: 16, color: "#444", textAlign: "right", writingDirection: "rtl" },
  sectionTitle: { marginTop: 20, fontSize: 18, fontWeight: "bold", textAlign: "right", writingDirection: "rtl" },
  description: { fontSize: 16, color: "#333", marginTop: 8, lineHeight: 24, textAlign: "right", writingDirection: "rtl" },
  views: { fontSize: 14, color: "#777", marginTop: 15, textAlign: "right", writingDirection: "rtl" },

  sellerContainer: { flexDirection: "row-reverse", alignItems: "center", marginTop: 25 },
  avatar: { width: 55, height: 55, borderRadius: 30, marginLeft: 10 },
  avatarPlaceholder: { width: 55, height: 55, borderRadius: 30, backgroundColor: "#ccc", marginLeft: 10 },
  sellerHeader: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" },
  sellerName: { fontSize: 17, fontWeight: "bold", writingDirection: "rtl" },
  memberSince: { fontSize: 14, color: "#777", writingDirection: "rtl" },

  reportBtn: { backgroundColor: "red", borderRadius: 5, paddingHorizontal: 6, paddingVertical: 2, marginLeft: 10 },

  modalContainer: { flex: 1, backgroundColor: "black" },
  modalContent: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalImage: { width: screenWidth, height: 280, resizeMode: "contain" },

  // ---------- Styles البلاغ ----------
  reportModalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  reportModalContent: { width: "80%", backgroundColor: "#fff", borderRadius: 10, padding: 20, alignItems: "center" },
  reportTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, writingDirection: "rtl" },
  reportOption: { width: "100%", paddingVertical: 12, paddingHorizontal: 10, backgroundColor: "#e33", borderRadius: 8, marginBottom: 10 },
  reportOptionText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  reportMessage: { position: "absolute", bottom: 30, left: 20, right: 20, backgroundColor: "#444", padding: 12, borderRadius: 8, zIndex: 10 },
});
