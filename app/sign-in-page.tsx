import { images } from "@/constants/images";
import { useSignInContext } from "@/contexts/sign-in-context/sign-in-context-provider";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./(styles)/sign-in-page-styles";


export default function SignInPage() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, signIn } = useSignInContext()


  const handleSignInPress = async () => {
    if (password == "") {
      alert("الرجاء ادخال كلمةالسر ")
      return;
    } else if (emailAddress == "") {
      alert("الرجاء ادخال البريد الإلكتروني ")
      return;
    } else if (emailAddress == "" && password == "") {
      alert("الرجاء ادخال كلمةالسر و البريد الإلكتروني ")
      return;
    }

    await signIn(emailAddress, password);
    router.replace("/(tabs)/home-page");

  };

  return (

    <ImageBackground
      style={styles.bg}
      source={require("../assets/images/backgroundphoto.jpg")}>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          {/* Logo */}
          <Image source={images.logo} style={styles.logo} />

          {/* Inputs */}
          <TextInput
            style={styles.input} placeholder="البريد الإلكتروني" placeholderTextColor="#999"
            value={emailAddress} onChangeText={setEmailAddress}
          />
          <TextInput style={styles.input} placeholder="كلمة السر" placeholderTextColor="#999"
           value={password} onChangeText={setPassword} secureTextEntry
          />

          {/* Login Button */}
          <TouchableOpacity style={styles.primaryBtn} onPress={handleSignInPress}>
            <Text style={styles.primaryText}>تسجيل الدخول</Text>
          </TouchableOpacity>

          {/* Dividing Line */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>أو</Text>
            <View style={styles.divider} />
          </View>

          {/* Secondary Buttons */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => router.replace("/home-page")}
            >
              <Text style={styles.secondaryText}>تخطي</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => router.push("/sign-up-page")}
            >
              <Text style={styles.secondaryText}>إنشاء حساب</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

