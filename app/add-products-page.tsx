import { AddProduct } from "@/api/api-prodcuts";
import { ThemedView } from "@/components/themed-view";
import { useSignInContext } from "@/contexts/sign-in-context/sign-in-context-provider";
import { useFetchCategories } from "@/hooks/fetch-categories";
import { useFetchProvinces } from "@/hooks/fetch-provinces";
import { Picker } from "@react-native-picker/picker";
import * as imagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./(styles)/add-product-page-styles";

/* ===== تنسيق الأرقام بمسافة ===== */
const formatNumberWithSpace = (value: string) => {
  if (!value) return "";
  const number = value.replace(/\D/g, "");
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const unformatNumberWithSpace = (value: string) => {
  return value.replace(/\s/g, "");
};
/* =============================== */

export default function AddProductPage() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [categoryValue, setSelectedValue] = useState("");
  const [selectedCityValue, setSelectedCityValue] = useState("");
  const [addressdescription, setaddressdescription] = useState("");
  const [imagelist, setImageList] = useState<{ id: string, uri: string }[]>([]);

  /* ===== المفاصلة ===== */
  const [enableBargain, setEnableBargain] = useState(false);
  const [bargainPrice, setBargainPrice] = useState("");

  const numericPrice = Number(price);
  const maxDiscount = numericPrice * 0.1;
  const minBargainPrice = numericPrice - maxDiscount;
  /* ==================== */

  const { categories } = useFetchCategories();
  const { provinces } = useFetchProvinces();
  const { user } = useSignInContext();

  /* ===== التحقق لتعطيل الزر ===== */
  const isPriceValid = numericPrice > 0;

  const isBargainValid =
    !enableBargain ||
    (
      bargainPrice !== "" &&
      Number(bargainPrice) >= minBargainPrice &&
      Number(bargainPrice) <= numericPrice
    );

  const isFormValid =
    name.trim() !== "" &&
    contact.trim() !== "" &&
    categoryValue !== "" &&
    selectedCityValue !== "" &&
    isPriceValid &&
    isBargainValid;
  /* =============================== */

  const selectImage = async () => {
    const permission =
      await imagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("الصور", "لازم تعطي صلاحية للوصول للصور");
      return;
    }

    try {
      const response = await imagePicker.launchImageLibraryAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        quality: 1,
        selectionLimit: 10,
        allowsMultipleSelection: true
      });

      if (response.canceled) return;

      if (response.assets && response.assets.length > 0) {
        const newImages = response.assets.map((asset) => ({
          id: (asset.uri || "") + Date.now().toString(),
          uri: asset.uri ?? ""
        }));

        setImageList((prev) => [...prev, ...newImages]);
      }
    } catch (error) {
      console.log("Image Picker Error:", error);
    }
  };

  const handleAddProduct = async () => {
    if (!isFormValid) {
      Alert.alert("خطأ", "يرجى تعبئة جميع الحقول بشكل صحيح");
      return;
    }

    const formData = new FormData();

    formData.append("ProductName", name);
    formData.append("Price", price);
    formData.append("Contact", contact);
    formData.append("Description", description);
    formData.append("CategoryId", categoryValue);
    formData.append("ProvinceId", selectedCityValue);
    if (user) formData.append("UserId", user.id);
    formData.append("AddressDescription", addressdescription);

    formData.append("BargainEnabled", enableBargain ? "true" : "false");
    if (enableBargain) {
      formData.append("BargainPrice", bargainPrice);
    }

    imagelist.forEach((img, index) => {
      formData.append("Images", {
        uri: img.uri,
        name: `product_${index}.jpg`,
        type: "image/jpeg",
      } as any);
    });

    try {
      await AddProduct({ formData });
      router.replace("/(tabs)/home-page");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <Text style={styles.sectionTitle}>معلومات المنتج</Text>
        <ThemedView>

          <TextInput
            placeholder="اسم المنتج"
            style={styles.inputStyle}
            value={name}
            onChangeText={setName}
          />

          <View style={styles.priceInputContainer}>
            <Text style={styles.currencySymbolStyle}>ل.س</Text>
            <TextInput
              placeholder="0"
              style={styles.inputStyle}
              keyboardType="numeric"
              value={formatNumberWithSpace(price)}
              onChangeText={(text) =>
                setPrice(unformatNumberWithSpace(text))
              }
            />
          </View>

          {/* ===== المفاصلة ===== */}
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={() => setEnableBargain(!enableBargain)}>
              <Text style={{ fontSize: 16 }}>
                {enableBargain ? "☑" : "☐"} تفعيل المفاصلة
              </Text>
            </TouchableOpacity>
          </View>

          {enableBargain && numericPrice > 0 && (
            <View style={{ marginTop: 10 }}>
              <TextInput
                placeholder={`أقل سعر ${formatNumberWithSpace(
                  minBargainPrice.toFixed(0)
                )} ل.س`}
                style={styles.inputStyle}
                keyboardType="numeric"
                value={formatNumberWithSpace(bargainPrice)}
                onChangeText={(text) =>
                  setBargainPrice(unformatNumberWithSpace(text))
                }
              />
              <Text style={{ color: "gray", fontSize: 12 }}>
                الحد الأقصى للخصم 10٪
              </Text>
            </View>
          )}

          <Picker
            selectedValue={categoryValue}
            onValueChange={(value) => setSelectedValue(value)}>
            <Picker.Item label="اختر الفئة" value="" />
            {categories.map(cat => (
              <Picker.Item key={cat.id} label={cat.categoryName} value={cat.id} />
            ))}
          </Picker>

          <TextInput
            placeholder="الوصف"
            style={styles.inputStyle}
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.sectionTitle}>الموقع</Text>
          <Picker
            selectedValue={selectedCityValue}
            onValueChange={(value) => setSelectedCityValue(value)}
          >
            <Picker.Item label="المدينة" value="" />
            {provinces.map(prov => (
              <Picker.Item key={prov.id} label={prov.provinceName} value={prov.id} />
            ))}
          </Picker>

          <TextInput
            placeholder="المنطقة و وصف العنوان"
            style={styles.inputStyle}
            value={addressdescription}
            onChangeText={setaddressdescription}
          />

          <Text style={styles.sectionTitle}>التواصل</Text>
          <TextInput
            placeholder="رقم التواصل"
            style={styles.inputStyle}
            value={contact}
            onChangeText={setContact}
            keyboardType="numeric"
          />

          <View style={styles.imageBox}>
            <TouchableOpacity onPress={selectImage}>
              <Image
                source={require('../assets/images/choce.png')}
                style={styles.uploadIcon}
              />
            </TouchableOpacity>
          </View>

          {imagelist.length > 0 && (
            <View style={styles.imagesPreviewContainer}>
              {imagelist.map((img) => (
                <View key={img.id} style={styles.imageWrapper}>
                  <Image source={{ uri: img.uri }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() =>
                      setImageList((prev) =>
                        prev.filter((i) => i.id !== img.id)
                      )
                    }
                  >
                    <Text style={styles.closeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* ===== زر الإضافة المعطّل تلقائيًا ===== */}
          <View style={{ opacity: isFormValid ? 1 : 0.5 }}>
            <Button
              title="إضافة المنتج"
              onPress={handleAddProduct}
              disabled={!isFormValid}
            />
          </View>

        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
