import { UpdateProfileImage } from "@/api/api-users";
import { Template } from "@/components/ui/template";
import { useSignInContext } from "@/contexts/sign-in-context/sign-in-context-provider";
import { useFetchUserProducts } from "@/hooks/fetch-user-products";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../(styles)/my-profile-styles";

type ProfileProps = {
  isOwner?: boolean; // true إذا هذا هو البروفايل الخاص بك
};

export default function ProfileScreen({ isOwner = true }: ProfileProps) {

  const [profileImage, setProfileImage] = useState<{ uri: string }>();
    const [imageUrl, setImageUrl] = useState<string|null>(null);
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState({
    email: "example@email.com",
    phone: "00963123456789",
  });
  const { user } = useSignInContext();
  const { products } = useFetchUserProducts();
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
  const onPress = async (prodcutId: any) => {
    router.push("/product-details");
  };

 
useEffect(() => {
  if (!user || !profileImage) return;

  const formData = new FormData();
  formData.append("UserId", user.id);
  formData.append("ProfileImage", {
    uri: profileImage.uri,
    name: `profile-${user.id}.jpg`,
    type: "image/jpeg",
  } as any);
const sendPhoto = async () => {
  const imageUrl = await UpdateProfileImage({formData});
  setImageUrl(imageUrl);
  user.profileImage = imageUrl;
}
 
sendPhoto();
}, [profileImage,user]);



 

  const pickImage = async () => {
    if (!isOwner) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      selectionLimit:1
      
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0]);
    }
  };

  const STATUS_BAR_HEIGHT = Platform.OS === "android" ? StatusBar.currentHeight || 25 : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: STATUS_BAR_HEIGHT + 10 }]}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={pickImage}>
            {user?.profileImage ? (
             <Image
  source={{
    uri:  user?.profileImage
        ? `${BASE_URL}${user.profileImage}`:`${BASE_URL}${imageUrl}`? `${BASE_URL}${imageUrl}`
        : profileImage?.uri,
  }}
  style={styles.profileImage}
/> 
            ) : (
              <View style={[styles.profileImage, styles.placeholder]}>
                <Text style={{ color: "#fff" }}>صورة</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            {isOwner ? (
              <TextInput
                style={styles.nameInput}
                value={`${user?.name ?? ""} ${user?.surName ?? ""}`}
                onChangeText={setName}
              />
            ) : (
              <Text style={styles.name}>{name}</Text>
            )}
            <Text style={styles.memberSince}>عضو منذ {user?.createdAt}</Text>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>تفاصيل الاتصال</Text>

          {isOwner ? (
            <>
              <TextInput
                style={styles.contactInput}
                value={user?.emailAddress}
                onChangeText={(text) =>
                  setContactInfo({ ...contactInfo, email: text })
                }
                placeholder="البريد الإلكتروني"
              />
              <TextInput
                style={styles.contactInput}
                value={contactInfo.phone}
                onChangeText={(text) =>
                  setContactInfo({ ...contactInfo, phone: text })
                }
                placeholder="رقم الهاتف"
              />
            </>
          ) : (
            <>
              <Text style={styles.contactText}>البريد الإلكتروني: {contactInfo.email}</Text>
              <Text style={styles.contactText}>رقم الهاتف: {contactInfo.phone}</Text>
            </>
          )}
        </View>

        {/* Products */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>منتجاتي</Text>

          <View style={styles.grid}>
            {products?.map((item) => 
                <Template
                  key={item.productId}
                  onPress={() => onPress(item.productId)}
                  price={item.price}
                  prodcutName={item.productName}
                  provinceName={item.provinceName}
                  imageUrl={item.imageUrl}
                />  
            )}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


