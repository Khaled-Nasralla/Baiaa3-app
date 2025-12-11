import { images } from "@/constants/images";
import { useSignInContext } from "@/contexts/signInContext/sign-in-context-provider";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInPage() {
  const [emailAddress,setEmailAddress] = useState("");
  const [password,setPassword] = useState("");
  const {loading, error,signIn} = useSignInContext()

   
const handleSignInPress = async () => {
  try {
    await signIn(emailAddress, password);
    router.push("/(tabs)/home-page");

  } catch (error: any) {
    alert("Login failed: " + error.response?.data || error.message);
  }
};

  return (

     <ImageBackground
     style={styles.bg}
      source={require("../assets/images/backgroundphoto.jpg")}
    >
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Logo */}
        <Image source={images.logo} style={styles.logo} />

        {/* Inputs */}
        <TextInput
          style={styles.input}
          placeholder="البريد الإلكتروني"
          placeholderTextColor="#999"
          value={emailAddress}
          onChangeText={setEmailAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="كلمة السر"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
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
            onPress={() => router.replace("/sign-up-page")}
          >
            <Text style={styles.secondaryText}>إنشاء حساب</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
      bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    alignItems: "center",
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
    resizeMode: "contain",
  },

  input: {
    width: "100%",
    backgroundColor: "#F0F0F0",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    fontSize: 16,
    marginTop: 15,
  },

  primaryBtn: {
    width: "100%",
    backgroundColor: "#6BC7F5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  primaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
    justifyContent: "center",
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDD",
  },

  dividerText: {
    marginHorizontal: 10,
    color: "#777",
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  secondaryBtn: {
    backgroundColor: "#EDEDED",
    paddingVertical: 12,
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
  },

  secondaryText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
