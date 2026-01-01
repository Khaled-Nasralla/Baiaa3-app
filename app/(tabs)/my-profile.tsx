import { UpdateProfileImage } from "@/api/api-users";
import { Template } from "@/components/ui/template";
import { usePagesContext } from "@/contexts/pages-context/pages-context-provider";
import { useSignInContext } from "@/contexts/sign-in-context/sign-in-context-provider";
import { Pages } from "@/enums/product-modals-options-enum";
import { useFetchUserProducts } from "@/hooks/fetch-user-products";
import * as ImagePicker from "expo-image-picker";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
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
  isOwner?: boolean;
};

export default function ProfileScreen({ isOwner = true }: ProfileProps) {
  const [profileImage, setProfileImage] = useState<{ uri: string }>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const { setPage } = usePagesContext();
  const [contactInfo, setContactInfo] = useState({
    email: "example@email.com",
    phone: "00963123456789",
  });

  const { user } = useSignInContext();
  const { products } = useFetchUserProducts();
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

  const onPressProduct = (productId: any) => {
    router.push("/product-details");
  };

  /* ===== رفع صورة البروفايل ===== */
  useEffect(() => {
    if (!user || !profileImage) return;
  useFocusEffect(
    useCallback(() => {
      setPage(Pages.MyProfile);
    }, [])
  );

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
      const imageUrl = await UpdateProfileImage({ formData });
      setImageUrl(imageUrl);
      user.profileImage = imageUrl;
    };

    sendPhoto();
  }, [profileImage, user]);
    const formData = new FormData();
    formData.append("UserId", user.id);
    formData.append("ProfileImage", {
      uri: profileImage.uri,
      name: `profile-${user.id}.jpg`,
      type: "image/jpeg",
    } as any);
    const sendPhoto = async () => {
      const imageUrl = await UpdateProfileImage({ formData });
      setImageUrl(imageUrl);
      user.profileImage = imageUrl;
    }

    sendPhoto();
  }, [profileImage, user]);


  const pickImage = async () => {
    if (!isOwner) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      selectionLimit: 1

    });

    if (!result.canceled) {
      setProfileImage(result.assets[0]);
    }
  };

  const STATUS_BAR_HEIGHT =
    Platform.OS === "android" ? StatusBar.currentHeight || 25 : 0;

  // عدد المفاصلات الواردة والصادرة (يمكن جلبه من API لاحقًا)
  const incomingCount = 3;
  const outgoingCount = 1;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: STATUS_BAR_HEIGHT + 10 },
        ]}
        showsVerticalScrollIndicator
      >
        {/* ===== Header ===== */}
        <View style={styles.header}>
          <TouchableOpacity onPress={pickImage}>
            {user?.profileImage ? (
              <Image
                source={{
                  uri: user?.profileImage
                    ? `${BASE_URL}${user.profileImage}` : `${BASE_URL}${imageUrl}` ? `${BASE_URL}${imageUrl}`
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
            <Text style={styles.memberSince}>
              عضو منذ {user?.createdAt}
            </Text>
          </View>
        </View>

        {/* ===== زر المفاصلة الاحترافي ===== */}
        {isOwner && (
          <TouchableOpacity
            style={styles.bargainButton}
            activeOpacity={0.85}
            onPress={() => router.push("/bargains")}
          >
            {/* أيقونة */}
            <View style={styles.bargainIcon}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>💬</Text>
            </View>

            {/* نص وعداد */}
            <View style={styles.bargainTextContainer}>
              <Text style={styles.bargainButtonText}>المفاصلة</Text>
              <Text style={styles.bargainButtonSub}>
                {incomingCount} وارد • {outgoingCount} صادر
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* ===== Contact ===== */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>تفاصيل الاتصال</Text>

          {isOwner ? (
            <>
              <TextInput
                style={styles.contactInput}
                value={user?.emailAddress}
                placeholder="البريد الإلكتروني"
              />
              <TextInput
                style={styles.contactInput}
                value={contactInfo.phone}
                placeholder="رقم الهاتف"
              />
            </>
          ) : (
            <>
              <Text style={styles.contactText}>
                البريد الإلكتروني: {contactInfo.email}
              </Text>
              <Text style={styles.contactText}>
                رقم الهاتف: {contactInfo.phone}
              </Text>
            </>
          )}
        </View>

        {/* ===== Products ===== */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>منتجاتي</Text>

          <View style={styles.grid}>
            {products?.map((item) =>
              <Template
                key={item.productId}
                id={item.productId}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
                onPress={() => onPressProduct(item.productId)}
                price={item.price}
                productName={item.productName}
                provinceName={item.provinceName}
                imageUrl={item.imageUrl}
                productUserId={item.userId}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
