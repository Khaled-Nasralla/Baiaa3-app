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
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedSection } from "../components/animatedSection";
import styles from "./(styles)/add-product-page-styles";

const formatNumberWithSpace = (value: string) => {
  if (!value) return "";
  const number = value.replace(/\D/g, "");
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const unformatNumberWithSpace = (value: string) => value.replace(/\s/g, "");

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [categoryValue, setSelectedValue] = useState("");
  const [selectedCityValue, setSelectedCityValue] = useState("");
  const [addressdescription, setaddressdescription] = useState("");
  const [imagelist, setImageList] = useState<{ id: string; uri: string }[]>([]);
  const [productCondition, setProductCondition] = useState<"new" | "used">("new");

  const { categories } = useFetchCategories();
  const { provinces } = useFetchProvinces();
  const { user } = useSignInContext();

  const numericPrice = Number(price);
  const isFormValid = name && contact && categoryValue && selectedCityValue && numericPrice > 0;

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const selectImage = async () => {
    const permission = await imagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("تنبيه", "يرجى السماح بالوصول للصور");
      return;
    }
    const response = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!response.canceled && response.assets) {
      const newImages = response.assets.map((asset) => ({
        id: asset.uri + Date.now(),
        uri: asset.uri,
      }));
      setImageList((prev) => [...prev, ...newImages]);
    }
  };

  const handleAddProduct = async () => {
    if (!isFormValid) {
      Alert.alert("خطأ", "يرجى تعبئة جميع الحقول");
      return;
    }

    const formData = new FormData();
    formData.append("ProductName", name);
    formData.append("Price", price);
    formData.append("Contact", contact);
    formData.append("Description", description);
    formData.append("CategoryId", categoryValue);
    formData.append("ProvinceId", selectedCityValue);
    formData.append("AddressDescription", addressdescription);
    formData.append("Condition", productCondition);
    if (user) formData.append("UserId", user.id);

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedView>

          {/* معلومات المنتج */}
          <AnimatedSection isActive={activeSection === "productInfo"}>
            <Text style={styles.sectionTitle}>معلومات المنتج</Text>
            <TextInput
              placeholder="اسم المنتج"
              style={styles.inputStyle}
              value={name}
              onChangeText={setName}
              onFocus={() => setActiveSection("productInfo")}
              onBlur={() => setActiveSection(null)}
            />

            {/* حالة المنتج */}
            <View style={styles.conditionContainer}>
              <TouchableOpacity
                style={[
                  styles.conditionButton,
                  productCondition === "new"
                    ? { backgroundColor: "#69ab75", borderColor: "#69ab75" }
                    : { backgroundColor: "#fff", borderColor: "#E2E2E2" },
                ]}
                onPress={() => setProductCondition("new")}
              >
                <Text
                  style={[
                    styles.conditionText,
                    productCondition === "new" ? { color: "#fff" } : { color: "#222" },
                  ]}
                >
                  جديد
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.conditionButton,
                  productCondition === "used"
                    ? { backgroundColor: "#d3b78f", borderColor: "#d3b78f" }
                    : { backgroundColor: "#fff", borderColor: "#E2E2E2" },
                ]}
                onPress={() => setProductCondition("used")}
              >
                <Text
                  style={[
                    styles.conditionText,
                    productCondition === "used" ? { color: "#fff" } : { color: "#222" },
                  ]}
                >
                  مستعمل
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.priceInputContainer}>
              <Text style={styles.currencySymbolStyle}>ل.س</Text>
              <TextInput
                placeholder="0"
                keyboardType="numeric"
                style={styles.priceInput}
                value={formatNumberWithSpace(price)}
                onChangeText={(text) => setPrice(unformatNumberWithSpace(text))}
                onFocus={() => setActiveSection("productInfo")}
                onBlur={() => setActiveSection(null)}
              />
            </View>

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={categoryValue}
                onValueChange={(value) => setSelectedValue(value)}
                onFocus={() => setActiveSection("productInfo")}
              >
                <Picker.Item label="اختر الفئة" value="" />
                {categories.map((cat) => (
                  <Picker.Item key={cat.id} label={cat.categoryName} value={cat.id} />
                ))}
              </Picker>
            </View>

            <TextInput
              placeholder="الوصف"
              style={styles.inputStyle}
              value={description}
              onChangeText={setDescription}
              onFocus={() => setActiveSection("productInfo")}
              onBlur={() => setActiveSection(null)}
            />
          </AnimatedSection>

          {/* الموقع */}
          <AnimatedSection isActive={activeSection === "location"}>
            <Text style={styles.sectionTitle}>الموقع</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedCityValue}
                onValueChange={(value) => setSelectedCityValue(value)}
                onFocus={() => setActiveSection("location")}
              >
                <Picker.Item label="المدينة" value="" />
                {provinces.map((prov) => (
                  <Picker.Item key={prov.id} label={prov.provinceName} value={prov.id} />
                ))}
              </Picker>
            </View>

            <TextInput
              placeholder="وصف العنوان"
              style={styles.inputStyle}
              value={addressdescription}
              onChangeText={setaddressdescription}
              onFocus={() => setActiveSection("location")}
              onBlur={() => setActiveSection(null)}
            />
          </AnimatedSection>

          {/* التواصل */}
          <AnimatedSection isActive={activeSection === "contact"}>
            <Text style={styles.sectionTitle}>التواصل</Text>
            <TextInput
              placeholder="رقم الهاتف"
              keyboardType="numeric"
              style={styles.inputStyle}
              value={contact}
              onChangeText={setContact}
              onFocus={() => setActiveSection("contact")}
              onBlur={() => setActiveSection(null)}
            />
          </AnimatedSection>

          {/* الصور */}
          <AnimatedSection isActive={activeSection === "images"}>
            <Text style={styles.sectionTitle}>الصور</Text>
            <View style={styles.imageBox}>
              <TouchableOpacity
                onPress={() => {
                  selectImage();
                  setActiveSection("images");
                }}
              >
                <Image
                  source={require("../assets/images/choce.png")}
                  style={styles.uploadIcon}
                />
              </TouchableOpacity>
            </View>

            {imagelist.length > 0 && (
              <View style={styles.imagesPreviewContainer}>
                {imagelist.map((img) => (
                  <View key={img.id} style={styles.imageWrapper}>
                    <Image
                      source={{ uri: img.uri }}
                      style={styles.previewImage}
                    />
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() =>
                        setImageList((prev) => prev.filter((i) => i.id !== img.id))
                      }
                    >
                      <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </AnimatedSection>

          <View style={{ opacity: isFormValid ? 1 : 0.5, marginBottom: 20 }}>
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
