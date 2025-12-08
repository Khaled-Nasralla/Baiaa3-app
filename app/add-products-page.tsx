import { ThemedView } from "@/components/themed-view";
import * as imagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Asset, ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddProductPage() {}
  
  const [image, setImage] = useState ("");
  const [imagelist, setImageList] = useState<Asset[] | { id: string; uri: string }[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");


const result = await imagePicker.launchImageLibraryAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      console.log('ImagePicker result:', result);

      const uri = result.assets?.[0]?.uri;

      if (!result.canceled && result.assets && result.assets.length > 0) {
    const selectedUri = result.assets[0].uri;
    setImage(selectedUri);
} else if (result.canceled) {
    console.log('Image selection was cancelled');
} else {
    console.log('No assets found');
}

  const pickImage = async () => {
    const permission = await imagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("لازم تعطي صلاحية للوصول للصور");
      return;
    }

  const selectImage = async () => {
  const pickerOption:
  ImageLibraryOptions = {
    selectionLimit: 10,
    mediaType: "photo"
  };

  try {
  
    
    const response = await launchImageLibrary(pickerOption);

    if (response.didCancel) return;

    if (response.assets && response.assets.length > 0) {
      const newImages = response.assets.map((asset) => ({
        id: (asset.uri || "") + Date.now().toString(),
        uri: asset.uri ?? "",
      }));

      setImageList((previmages: any) => [...previmages, ...newImages]);
    }
  } catch (error) {
    console.log('Image Picker Error:', error);
  }
};
  const handleAddProduct = () => {
    if (!name || !price || !contact) {
      Alert.alert("خطأ", "يرجى تعبئة الحقول المطلوبة");
      return;
    }

    const productData = {
      name,
      price,
      contact,
      description,
    };
    console.log("Product Data:", productData);
    Alert.alert("تم", "تمت إضافة المنتج بنجاح");

    setName("");
    setPrice("");
    setContact("");
    setDescription("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView>
        <TextInput
          placeholder="اسم المنتج"
          style={styles.inputStyle}
          value={name}
          onChangeText={setName}
        />

return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}
    </View>
  );


<View style={styles.priceInputContainer}>
    <Text
    style={styles.currencySymbolStyle}>
        ل.س
        </Text>

        <TextInput
          placeholder="السعر"
          style={styles.inputStyle}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        </View>

        <TextInput
          placeholder="رقم التواصل"
          style={styles.inputStyle}
          value={contact}
          onChangeText={setContact}
          keyboardType={"numeric"}
        />

        <TextInput
          placeholder="الوصف"
          style={styles.inputStyle}
          value={description}
          onChangeText={setDescription}
        />

<TouchableOpacity onPress={selectImage} style={styles.imagePickerButton}>
            <Text style={styles.imagePickerButtonText}>اختر الصور</Text>
        </TouchableOpacity>
        {imagelist.length > 0 && imagelist[0].id !== '' && (
            <View style={styles.imagesPreviewContainer}>
                {imagelist.map((image, index) => (
                      <Image 
                        key={index} 
                        source={{ uri: image.uri }} 
                        style={styles.previewImage} 
                    />
                ))}
            </View>
)}
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
    backgroundColor: "#f0f0f0",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  priceInputContainer: {
    flexDirection: 'row-reverse', 
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 10,
  },

  inputstyle: {
    flex: 1, 
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 18,
    color: "#000",
    paddingVertical: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
    height: "100%",
  },

  currencySymbolStyle: {
    fontSize: 16,
    color: '#555',
    marginRight: 8,
  },
  imagePickerButton: {
        backgroundColor: '#1b8bff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    imagePickerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imagesPreviewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginBottom: 10,
    },
    previewImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
        margin: 5,
    },

});
