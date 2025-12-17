import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./(styles)/verify-id-styles";
export default function VerifyID() {
  const [permission, requestPermission] = useCameraPermissions();
  const [step, setStep] = useState<"id" | "selfie">("id");
  const [idPhoto, setIdPhoto] = useState<any>(null);
  const [selfiePhoto, setSelfiePhoto] = useState<any>(null);

  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.7,
      skipProcessing: true,
    });

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

      // نجاح التحقق المنطقي
      router.replace("/payment-method");
    }
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>جاري التحقق من الإذن...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.permissionText}>
          نحتاج إذن الكاميرا للتحقق من الهوية
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>السماح</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* الكاميرا */}
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}

        facing={step === "id" ? "back" : "front"}
      />

      {/* طبقة فوق الكاميرا */}
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
              : "التقط صورة سيلفي واضحة"}
          </Text>
        </View>

        {/* إطار توجيهي */}
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
            style={styles.preview}
          />
        )}

        {/* زر التصوير */}
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePhoto}
          >
            <View style={styles.innerButton} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
