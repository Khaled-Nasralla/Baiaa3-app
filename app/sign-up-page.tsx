import { ThemedView } from "@/components/themed-view";
import { useSignUPContext } from "@/contexts/sign-up-context/sign-up-context-provider";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./(styles)/sign-up-styles";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [identityVerified, setIdentityVerified] = useState(false);

  const { signUp, loading } = useSignUPContext();

  // تحقق من حالة الهوية عند التركيب
  useEffect(() => {
    const checkVerification = async () => {
      const verified = await AsyncStorage.getItem("identityVerified");
      if (verified === "true") setIdentityVerified(true);
    };
    checkVerification();
  }, []);

  const handleSignUp = async () => {
    if (confirmPassword != password) {
      Alert.alert("كلمة المرور غير متطابقة");
      return;
    }
    if (!identityVerified) {
      Alert.alert("يرجى التحقق من الهوية قبل التسجيل");
      return;
    }

    const result = await signUp({
      id: "",
      name,
      surName: surname,
      emailAddress,
      password,
      profileImage: "",
      createdAt: "",
    });

    if (!result.success) {
      alert(result.message);
      return;
    } else {
      alert(result.message);
    }

    await AsyncStorage.removeItem("identityVerified");
    router.replace("/sign-in-page");
  };

  return (
    <ImageBackground
      style={styles.bg}
      source={require("../assets/images/backgroundphoto.jpg")}
    >
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <TextInput
            style={styles.inputStyles}
            placeholder="الاسم"
            onChangeText={setName}
            value={name}
          />
          <TextInput
            style={styles.inputStyles}
            placeholder="الكنية"
            onChangeText={setSurname}
            value={surname}
          />
          <TextInput
            style={styles.inputStyles}
            placeholder="الأيميل"
            onChangeText={setEmailAddress}
            value={emailAddress}
          />
          <TextInput
            style={styles.inputStyles}
            placeholder="كلمة المرور"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <TextInput
            style={styles.inputStyles}
            placeholder="تأكيد كلمة المرور"
            secureTextEntry
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />

          {/* زر التحقق من الهوية الاحترافي */}
          <View style={styles.verifyRow}>
            <TouchableOpacity
              onPress={() => router.push("/verify-id")}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={identityVerified ? ["#4CAF50", "#43A047"] : ["#2196F3", "#1E88E5"]}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.verifyBtn}
              >
                <Ionicons name="id-card-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.verifyBtnText}>التحقق من الهوية</Text>
                {identityVerified && (
                  <Ionicons name="checkmark-circle" size={24} color="#fff" style={{ marginLeft: 8 }} />
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* زر التسجيل */}
          <ThemedView style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnStyle} onPress={handleSignUp}>
              <Text style={styles.textBtn}>تسجيل إشتراك</Text>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </ImageBackground>
  );
}
