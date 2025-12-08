import { ThemedView } from "@/components/themed-view";
import * as imagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddProductPage() {


  const [image, setImage] = useState<string | null>(null);
  const [imagelist, setImageList] = useState<{ id: string; uri: string }[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");



  // Multi-image picker (react-native-image-picker)
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
      selectionLimit:100,
      allowsMultipleSelection: true
    });



      if (response.canceled) return;

      if (response.assets && response.assets.length > 0) {
        const newImages = response.assets.map((asset) => ({
          id: (asset.uri || "") + Date.now().toString(),
          uri: asset.uri ?? ""
        }));

        if (newImages) {
          setImageList((prev) => [...prev, ...newImages]);
        }
      }
    } catch (error) {
      console.log("Image Picker Error:", error);
    }
  };

  // Add product logic
  const handleAddProduct = () => {
    if (!name || !price || !contact) {
      Alert.alert("خطأ", "يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    const productData = {
      name,
      price,
      contact,
      description,
      image,
      imagelist
    };

    console.log("Product Data:", productData);
    Alert.alert("تم", "تمت إضافة المنتج بنجاح");

    // Reset
    setName("");
    setPrice("");
    setContact("");
    setDescription("");
    setImage(null);
    setImageList([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView>
        {/* Name */}
        <TextInput
          placeholder="اسم المنتج"
          style={styles.inputStyle}
          value={name}
          onChangeText={setName}
        />

        {/* Single Image Picker */}
        <Button title="اختيار صورة" onPress={selectImage} />

        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, marginTop: 20 }}
          />
        )}

        {/* Price */}
        <View style={styles.priceInputContainer}>
          <Text style={styles.currencySymbolStyle}>ل.س</Text>

          <TextInput
            placeholder="السعر"
            style={styles.inputStyle}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>

        {/* Contact */}
        <TextInput
          placeholder="رقم التواصل"
          style={styles.inputStyle}
          value={contact}
          onChangeText={setContact}
          keyboardType="numeric"
        />

        {/* Description */}
        <TextInput
          placeholder="الوصف"
          style={styles.inputStyle}
          value={description}
          onChangeText={setDescription}
        />

        {/* Multi Image Picker */}
        <TouchableOpacity
          onPress={selectImage}
          style={styles.imagePickerButton}
        >
          <Text style={styles.imagePickerButtonText}>اختر عدة صور</Text>
        </TouchableOpacity>

        {imagelist.length > 0 && (
          <View style={styles.imagesPreviewContainer}>
            {imagelist.map((img) => (
              <Image
                key={img.id}
                source={{ uri: img.uri }}
                style={styles.previewImage}
              />
            ))}
          </View>
        )}

        {/* Add Button */}
        <Button title="إضافة المنتج" onPress={handleAddProduct} />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    margin: 10,
    padding: 10,
    color: "#1b8bff",
    borderRadius: 10,
    backgroundColor: "#f0f0f0"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  priceInputContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 10
  },
  currencySymbolStyle: {
    fontSize: 16,
    color: "#555",
    marginRight: 8
  },
  imagePickerButton: {
    backgroundColor: "#1b8bff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10
  },
  imagePickerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  imagesPreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 10
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    margin: 5
  }
});
