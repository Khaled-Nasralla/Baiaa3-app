import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyID() {
  const [permission, requestPermission] = useCameraPermissions();
  const [step, setStep] = useState<"id" | "selfie">("id");
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });

    if (!photo) return;

    if (step === "id") {
      setStep("selfie");
    } else {
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
        style={StyleSheet.absoluteFill}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  overlay: {
    flex: 1,
    justifyContent: "space-between",
  },

  header: {
    marginTop: 20,
    alignItems: "center",
    gap: 10,
  },

  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  frame: {
    alignSelf: "center",
    width: "85%",
    height: 220,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 16,
    marginTop: 40,
  },

  selfieFrame: {
    width: 240,
    height: 240,
    borderRadius: 120,
  },

  bottom: {
    alignItems: "center",
    marginBottom: 40, // بعيد عن أسفل الهاتف
  },

  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  innerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  permissionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },

  permissionButton: {
    backgroundColor: "#2F6BFF",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
  },

  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
