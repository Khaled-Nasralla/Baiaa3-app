import { images } from "@/constants/images";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


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
  publisherName?: string;
  publisherAvatarUri?: string | null;
  memberSince?: string;
};

type RouteProps = RouteProp<{ ProductDetails: ProductDetailsParams }, "ProductDetails">;


// ==============================
// 2️⃣ المكون الرئيسي
// ==============================
export default function ProductDetails1() {

  const route = useRoute<RouteProps>();
  const params = route.params || {};

  // ==========================
  // 2.1 حالة عرض الصورة في Modal
  // ==========================
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const openImage = (img: any) => {
    setSelectedImage(img);
    setModalVisible(true);
  }


  // ==========================
  // 2.2 البيانات الأساسية للمنتج
  // ==========================
  const {
    productName = "اسم المنتج هنا",
    price = "150 يورو",
    location = "برلين، ألمانيا",
    postedTime = "منذ ساعتين",
    description = "الوصف الإجباري",
    views = 0,
    publisherName = "Hesham Alhajj",
    publisherAvatarUri = null,
    memberSince = "2024",
  } = params;


  // ==========================
  // 2.3 صور التجريب
  // ==========================
  const productImages = [
    images.clothes,
    images.electric,
    images.jobs,
    images.makeUp,
  ];


  return (
    <ScrollView style={styles.container}>

      {/* ==========================
          3️⃣ معرض الصور
      ========================== */}
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


      {/* ==========================
          4️⃣ تفاصيل المنتج
      ========================== */}
      <View style={styles.detailsBox}>

        <Text style={styles.productName}>{productName}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.postedTime}>{postedTime}</Text>

        <Text style={styles.sectionTitle}>الوصف</Text>
        <Text style={styles.description}>{description}</Text>

        <Text style={styles.views}>{views} مشاهدة</Text>

        {/* ==========================
            4.1 معلومات البائع
        ========================== */}
        <View style={styles.sellerContainer}>
          {publisherAvatarUri ? (
            <Image
              source={{ uri: publisherAvatarUri }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder} />
          )}

          <View>
            <Text style={styles.sellerName}>{publisherName}</Text>
            <Text style={styles.memberSince}>عضو منذ {memberSince}</Text>
          </View>
        </View>

      </View>


      {/* ==========================
          5️⃣ Modal لتكبير الصورة
      ========================== */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <ScrollView
            maximumZoomScale={5}
            minimumZoomScale={1}
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={selectedImage}
                style={{
                  width: screenWidth,
                  height: 280,
                  resizeMode: "contain"
                }}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

    </ScrollView>
  );
}


// ==============================
// 6️⃣ Styles
// ==============================
const styles = StyleSheet.create({

  container: { 
    flex: 1, 
    backgroundColor: "#f6f6f6" 
  },

  imagesScroll: { 
    width: screenWidth, 
    height: 280, 
    backgroundColor: "#eee" 
  },

  productImage: { 
    width: screenWidth, 
    height: 280, 
    resizeMode: "cover" 
  },

  detailsBox: { 
    padding: 20, 
    backgroundColor: "#fff", 
    marginTop: -20, 
    borderTopRightRadius: 20, 
    borderTopLeftRadius: 20 
  },

  productName: { 
    fontSize: 26, 
    fontWeight: "bold", 
    textAlign: "right", 
    writingDirection: "rtl" 
  },

  price: { 
    fontSize: 24, 
    marginTop: 10, 
    fontWeight: "bold", 
    color: "red", 
    textAlign: "right", 
    writingDirection: "rtl" 
  },

  location: { 
    fontSize: 16, 
    color: "#666", 
    marginTop: 5, 
    textAlign: "right", 
    writingDirection: "rtl" 
  },

  postedTime: { 
    fontSize: 16, 
    color: "#444", 
    textAlign: "right", 
    writingDirection: "rtl" 
  },

  sectionTitle: { 
    marginTop: 20, 
    fontSize: 18, 
    fontWeight: "bold", 
    textAlign: "right", 
    writingDirection: "rtl" 
  },

  description: { 
    fontSize: 16, 
    color: "#333", 
    marginTop: 8, 
    lineHeight: 24, 
    textAlign: "right", 
    writingDirection: "rtl" 
  },

  views: { 
    fontSize: 14, 
    color: "#777", 
    marginTop: 15, 
    textAlign: "right", 
    writingDirection: "rtl" 
  },

  sellerContainer: { 
    flexDirection: "row-reverse", 
    alignItems: "center", 
    marginTop: 25 
  },

  avatar: { 
    width: 55, 
    height: 55, 
    borderRadius: 30, 
    marginLeft: 10 
  },

  avatarPlaceholder: { 
    width: 55, 
    height: 55, 
    borderRadius: 30, 
    backgroundColor: "#ccc", 
    marginLeft: 10 
  },

  sellerName: { 
    fontSize: 17, 
    fontWeight: "bold", 
    writingDirection: "rtl" 
  },

  memberSince: { 
    fontSize: 14, 
    color: "#777", 
    writingDirection: "rtl" 
  },

});
