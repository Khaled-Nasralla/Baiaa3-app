import { AddProduct } from "@/api/api-prodcuts";
import { ThemedView } from "@/components/themed-view";
import { useSignInContext } from "@/contexts/sign-in-context/sign-in-context-provider";
import { Product } from "@/entities/prodcut";
import { useFetchCategories } from "@/hooks/fetch-categories";
import { useFetchProvinces } from "@/hooks/fetch-provinces";
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
import styles from "./(styles)/add-product-page-styles";


export default function AddProductPage() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [categoryValue, setSelectedValue] = useState("");
  const [selectedCityValue, setSelectedCityValue ] = useState ("");
  const [addressdescription, setaddressdescription] = useState("");
  const [imagelist, setImageList] = useState<{ id: string; uri: string }[]>([]);
  const {categories} = useFetchCategories();
  const {provinces}=useFetchProvinces();
  const {user} = useSignInContext();

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
  const handleAddProduct =  async () => {
    if (!name || !price || !contact) {
      Alert.alert("خطأ", "يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    const productData : Product = { prodcutName : name, price : price, contact : contact, description : description,
      imagelist : imagelist, createdAt : Date.now.toString(),
      catgoryId : categoryValue, userId : user?.id, productId : "", province_Id : "", addressDescription : addressdescription
    }; 

try {
  const reponse = await AddProduct({product:productData});

}catch (err : any){
  console.log("error baby")
}finally{
    // Reset
    setName("");
    setPrice("");
    setContact("");
    setDescription("");
    setImageList([]);
}
  };



  return (
    <SafeAreaView style={styles.container}>

    <ScrollView showsVerticalScrollIndicator={true}>

      <Text style={styles.sectionTitle}>معلومات المنتج</Text>


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
          selectedValue={categoryValue}
          onValueChange={(value) => setSelectedValue(value)}>
          <Picker.Item label="اختر الفئة" value="" />
          {categories.map(cat => (
    <Picker.Item key={cat.id} label={cat.categoryName} value={cat.id} />
  ))}
        </Picker>

 {/* Description */}
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
          )

          )}
        </Picker>
       
        {/*AddressDescription */}
        <TextInput
        placeholder="المنطقة و وصف العنوان"
        style={styles.inputStyle}
        value={addressdescription}
        onChangeText={setaddressdescription}
        />

       <Text style={styles.sectionTitle}>التواصل</Text>


        {/* Contact */}
        <TextInput
          placeholder="رقم التواصل"
          style={styles.inputStyle}
          value={contact}
          onChangeText={setContact}
          keyboardType="numeric"
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
