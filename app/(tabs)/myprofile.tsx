import { Template } from "@/components/ui/template";
import { useSignInContext } from "@/contexts/signInContext/sign-in-context-provider";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProfileProps = {
  isOwner?: boolean; // true إذا هذا هو البروفايل الخاص بك
};

export default function ProfileScreen({ isOwner = true }: ProfileProps) {

  const [profileImage, setProfileImage] = useState<any>(null);
  const [name, setName] = useState("Hesham Alhajj");
  const [memberSince, setMemberSince] = useState("2024");
  const [contactInfo, setContactInfo] = useState({
    email: "example@email.com",
    phone: "00963123456789",
  });
  const {user} = useSignInContext();
    


  const [myProducts, setMyProducts] = useState([
    { id: "1", title: "منتج 1" },
    { id: "2", title: "منتج 2" },
    { id: "3", title: "منتج 3" },
    { id: "4", title: "منتج 4" },
    { id: "5", title: "منتج 5" },
    { id: "6", title: "منتج 6" },
  ]);

  const pickImage = async () => {
    if (!isOwner) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
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
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
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
            <Text style={styles.memberSince}>عضو منذ {memberSince}</Text>
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
            {myProducts.map((item) => (
              <Template
                key={item.id}
                onPress={() => router.push("/productDetails")}
              />
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 15,
    paddingBottom: 40, // مساحة أسفل الصفحة
  },

  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 20,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ccc",
  },

  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#888",
  },

  headerInfo: {
    flex: 1,
    marginRight: 15,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    writingDirection: "rtl",
  },

  nameInput: {
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 2,
  },

  memberSince: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },

  contactSection: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    writingDirection: "rtl",
  },

  contactInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    textAlign: "right",
    writingDirection: "rtl",
  },

  contactText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },

  productsSection: {
    marginBottom: 30,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

});
