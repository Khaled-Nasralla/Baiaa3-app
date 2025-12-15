import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function PaymentConfirm() {
  const { method } = useLocalSearchParams();
  const router = useRouter();

  const confirmPayment = async () => {
    // نفترض الدفع ناجح
    
const pending = await AsyncStorage.getItem("pendingSubscription");

if (pending) {
  await AsyncStorage.setItem("subscriptionType", pending);
  await AsyncStorage.removeItem("pendingSubscription");
}


    alert("تم الدفع وتفعيل الاشتراك");
    router.replace("/settings");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        الدفع عبر {method}
      </Text>

      <TextInput
        placeholder="رقم المحفظة"
        style={{ borderWidth: 1, marginTop: 20, padding: 15, borderRadius: 10 }}
      />

      <TextInput
        placeholder="كود العملية"
        style={{ borderWidth: 1, marginTop: 15, padding: 15, borderRadius: 10 }}
      />

      <TouchableOpacity
        onPress={confirmPayment}
        style={{
          marginTop: 30,
          backgroundColor: "#2F6BFF",
          padding: 18,
          borderRadius: 14,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>تأكيد الدفع</Text>
      </TouchableOpacity>
    </View>
  );
}
