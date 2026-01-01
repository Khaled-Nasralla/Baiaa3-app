import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./(styles)/verify-id-styles";

const { width, height } = Dimensions.get("window");

export default function VerifyID() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [step, setStep] = useState<"id" | "selfie">("id");
  const [idPhoto, setIdPhoto] = useState<any>(null);
  const [selfiePhoto, setSelfiePhoto] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);

  const cameraRef = useRef<CameraView | null>(null);

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    if (!photo) return;

    if (step === "id") {
      setIdPhoto(photo);
      setStep("selfie");
    } else {
      setSelfiePhoto(photo);

      if (!idPhoto) {
        Alert.alert("خطأ", "يرجى تصوير الهوية أولاً");
        return;
      }

      // محاكاة التحقق
      setVerifying(true);
      setTimeout(async () => {
        setVerifying(false);
        Alert.alert("تم التحقق من الهوية بنجاح!");
        await AsyncStorage.setItem("identityVerified", "true"); // حفظ الحالة
        router.back(); // العودة لصفحة تسجيل الاشتراك
      }, 3000);
    }
  };

  if (!permission) return <Text>جاري التحقق من الإذن...</Text>;
  if (!permission.granted)
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.permissionText}>
          نحتاج إذن الكاميرا للتحقق من الهوية
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>السماح</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={step === "id" ? "back" : "front"}
      />

      <SafeAreaView style={styles.overlay}>
        {/* العنوان */}
        <View style={styles.header}>
          <Ionicons
            name={step === "id" ? "card-outline" : "person-outline"}
            size={28}
            color="#fff"
          />
          <Text style={styles.headerText}>
            {step === "id"
              ? "صوّر الهوية داخل الإطار"
              : "التقط صورة سيلفي واضحة داخل الدائرة"}
          </Text>
        </View>

        {/* الإطار الدائري */}
        <View
          style={[
            styles.frame,
            step === "selfie" && styles.selfieFrame,
          ]}
        />

        {/* معاينة الهوية أثناء السيلفي */}
        {step === "selfie" && idPhoto && (
          <Image
            source={{ uri: idPhoto.uri }}
            style={[styles.preview, { width: 200, height: 120, top: height/2 - 60 }]}
          />
        )}

        {/* زر الالتقاط أو Loader */}
        <View style={styles.bottom}>
          {verifying ? (
            <View style={styles.loader}>
              <Text style={styles.loaderText}>جارٍ التحقق...</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
              <View style={styles.innerButton} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
