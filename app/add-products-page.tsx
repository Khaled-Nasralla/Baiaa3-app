import { ThemedView } from "@/components/themed-view";
import { Picker } from "@react-native-picker/picker";
import * as imagePicker from "expo-image-picker";
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
import { styles } from "./(styles)/add-product-page-styles";


export default function AddProductPage() {


  const [image, setImage] = useState<string | null>(null);
  const [imagelist, setImageList] = useState<{ id: string; uri: string }[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCityValue, setSelectedCityValue ] = useState ("");
  const [addressdescription, setaddressdescription] = useState("");

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
      selectionLimit:10,
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

    <ScrollView showsVerticalScrollIndicator={true}>

      <ThemedView>
        {/* Name */}
        <TextInput
          placeholder="اسم المنتج"
          style={styles.inputStyle}
          value={name}
          onChangeText={setName}
        />

        {/* Price */}
        <View style={styles.priceInputContainer}>
             <Text style={styles.currencySymbolStyle}>ل.س</Text>
          <TextInput
            placeholder="0"
            style={styles.inputStyle}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
       
        </View>
          <Picker
          selectedValue={selectedValue}
          onValueChange={(value) => setSelectedValue(value)}
        >
          <Picker.Item label="اختر الفئة" value="" />
          <Picker.Item label="سيارات و دراجات" value="سيارات و دراجات" />
          <Picker.Item label="هواتف و اجهزة محمولة" value="هواتف و اجهزة محمولة" />
          <Picker.Item label="معدات" value="معدات" />
          <Picker.Item label="الالبسة و الموضة" value="الالبسة و الموضة" />
          <Picker.Item label="التجميل و العناية" value="التجميل و العناية" />
          <Picker.Item label="مطاعم و كافيهات" value="مطاعم و كافيهات" />
          <Picker.Item label="فرص عمل" value="فرص عمل" />
          <Picker.Item label="أجهزة كهربائية" value="أجهزة كهربائية" />
          <Picker.Item label="أدوات منزلية" value="أدوات منزلية" />
        </Picker>

        

<Picker
          selectedValue={selectedCityValue}
          onValueChange={(value) => setSelectedCityValue(value)}
        >
          <Picker.Item label="المدينة" value="" />
          <Picker.Item label="دمشق" value="دمشق" />
          <Picker.Item label="ريف دمشق" value="دمشق" />
        </Picker>
       
        {/*AddressDescription */}
        <TextInput
        placeholder="المنطقة و وصف العنوان"
        style={styles.inputStyle}
        value={addressdescription}
        onChangeText={setaddressdescription}
        />

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
        
          {/* Single Image Picker */}
        <View style={styles.imageBox}>
  <TouchableOpacity onPress={selectImage} activeOpacity={0.9}>
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
        <Image
          source={{ uri: img.uri }}
          style={styles.previewImage}
        />
        {/* زر الإغلاق × */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            setImageList((prev) =>
              prev.filter((i) => i.id !== img.id)
            );
          }}
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    ))}
  </View>
)}
        {/* Add Button */}
        <Button title="إضافة المنتج" onPress={handleAddProduct} />
      </ThemedView>
</ScrollView>
    </SafeAreaView>
    
    
  );
}

