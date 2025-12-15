import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentMethods() {
  const [method, setMethod] = useState<string | null>(null);
  const router = useRouter();

  // 🔒 حماية الصفحة
  useEffect(() => {
    AsyncStorage.getItem("pendingSubscription").then((value) => {
      if (!value) {
        alert("يرجى اختيار اشتراك أولًا");
        router.replace("/(tabs)/settings");
      }
    });
  }, []);

  const methods = [
    {
      id: "syria",
      title: "Syria Cash",
      icon: "wallet-outline",
    },
    {
      id: "syriatel",
      title: "Syriatel Cash",
      icon: "phone-portrait-outline",
    },
    {
      id: "mtn",
      title: "MTN Cash",
      icon: "phone-portrait-outline",
    },
  ];

  const continueHandler = () => {
    if (!method) {
      alert("يرجى اختيار طريقة الدفع");
      return;
    }

    router.push({
      pathname: "/payment-confirm" as any,
      params: { method },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>اختر طريقة الدفع</Text>

        {methods.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              method === item.id && styles.activeCard,
            ]}
            onPress={() => setMethod(item.id)}
            activeOpacity={0.85}
          >
            <Ionicons
              name={item.icon as any}
              size={26}
              color={method === item.id ? "#2F6BFF" : "#6B7280"}
            />

            <Text style={styles.cardText}>{item.title}</Text>

            {method === item.id && (
              <Ionicons
                name="checkmark-circle"
                size={22}
                color="#2F6BFF"
                style={{ marginLeft: "auto" }}
              />
            )}
          </TouchableOpacity>
        ))}

        {method && (
          <View style={styles.noticeBox}>
            <Ionicons
              name="information-circle-outline"
              size={22}
              color="#2563EB"
            />
            <Text style={styles.noticeText}>
              المحفظة التي يجب التحويل إليها:
              {"\n"}
              <Text style={styles.bold}>0999 123 456</Text>
              {"\n\n"}
              بعد التحويل يرجى إدخال:
              {"\n"}• رقم محفظتك
              {"\n"}• كود العملية
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            !method && { opacity: 0.4 },
          ]}
          onPress={continueHandler}
          disabled={!method}
        >
          <Text style={styles.buttonText}>متابعة</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    marginBottom: 14,
  },

  activeCard: {
    borderColor: "#2F6BFF",
    backgroundColor: "#EEF3FF",
  },

  cardText: {
    fontSize: 16,
    fontWeight: "600",
  },

  noticeBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },

  noticeText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: "#1E3A8A",
  },

  bold: {
    fontWeight: "700",
    fontSize: 15,
  },

  button: {
    marginTop: 30,
    backgroundColor: "#2F6BFF",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
