import { images } from "@/constants/images";
import { useSignInContext } from "@/contexts/sign-in-context/sign-in-context-provider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const [subscriptionType, setSubscriptionType] = useState("free");
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  const [userMessage, setUserMessage] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {signOut} = useSignInContext()

  const currentPassword = "123456"; // كلمة السر الحالية تجريبية

  const getSubscriptionText = () => {
    switch (subscriptionType) {
      case "gold":
        return "الاشتراك الذهبي";
      case "business":
        return "اشتراك الشركات";
      default:
        return "الحساب المجاني";
    }
  };

  const getSubscriptionIcon = () => {
    switch (subscriptionType) {
      case "gold":
        return "trophy-outline";
      case "business":
        return "briefcase-outline";
      default:
        return "person-outline";
    }
  };

   const handleSignOut = () => {
   
     signOut()
     router.push("/sign-in-page");
  
   }

  return (
    <ScrollView style={styles.container}>
      {/* ------- اللوغو ------- */}
      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logo} />

        {/* -------- بطاقة حالة الاشتراك -------- */}
        <View style={styles.subscriptionCard}>
          <Ionicons name={getSubscriptionIcon()} size={24} color="#fff" />
          <Text style={styles.subscriptionLabel}>{getSubscriptionText()}</Text>
        </View>
      </View>

      {/* ------- تعديل كلمة السر ------- */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => setPasswordModal(true)}
      >
        <Ionicons name="lock-closed-outline" size={22} color="#007bff" />
        <Text style={styles.optionText}>تعديل كلمة السر</Text>
      </TouchableOpacity>

      {/* ------- زر تغيير الاشتراك ------- */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => setSubscriptionModal(true)}
      >
        <Ionicons name="wallet-outline" size={22} color="#007bff" />
        <Text style={styles.optionText}>تغيير الاشتراك</Text>
      </TouchableOpacity>

      {/* ------- شروط الاستخدام و سياسة الخصوصية ------- */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => router.push("/terms")}
      >
        <Ionicons name="document-text-outline" size={22} color="#007bff" />
        <Text style={styles.optionText}>شروط الاستخدام و سياسة الخصوصية</Text>
      </TouchableOpacity>

      {/* ------- مركز المساعدة ------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>مركز المساعدة</Text>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setContactModal(true)}
        >
          <Ionicons name="chatbox-ellipses-outline" size={22} color="#007bff" />
          <Text style={styles.optionText}>تواصل معنا</Text>
        </TouchableOpacity>
      </View>

      {/* ------- تسجيل الخروج ------- */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={22} color="red" />
        <Text style={styles.logoutText}>تسجيل الخروج</Text>
      </TouchableOpacity>

      {/* ----------------- نافذة تغيير الاشتراك ----------------- */}
      <Modal visible={subscriptionModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>اختر نوع الاشتراك</Text>

            <TouchableOpacity
              style={styles.subscriptionOption}
              onPress={() => {
                setSubscriptionType("free");
                setSubscriptionModal(false);
              }}
            >
              <Text style={styles.subscriptionTitle}>الاشتراك المجاني</Text>
              <Text style={styles.subscriptionDesc}>
                نشر 5 منتجات فقط – تحذف بعد شهر
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.subscriptionOption}
              onPress={() => {
                setSubscriptionType("gold");
                setSubscriptionModal(false);
              }}
            >
              <Text style={styles.subscriptionTitle}>الاشتراك الذهبي – 7$</Text>
              <Text style={styles.subscriptionDesc}>
                نشر 15 منشور – ظهور أعلى الصفحة – حذف بعد شهر
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.subscriptionOption}
              onPress={() => {
                setSubscriptionType("business");
                setSubscriptionModal(false);
              }}
            >
              <Text style={styles.subscriptionTitle}>اشتراك الشركات – 12$</Text>
              <Text style={styles.subscriptionDesc}>
                عدد غير محدود – توثيق – ظهور أعلى الصفحة
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setSubscriptionModal(false)}
            >
              <Text style={styles.cancelText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ----------------- نافذة تواصل معنا ----------------- */}
      <Modal visible={contactModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>تواصل معنا</Text>
            <Text style={styles.subscriptionDesc}>
              نحن دائمًا بجانبك، يمكنك كتابة رسالتك أدناه:
            </Text>

            <TextInput
              style={styles.userMessageInput}
              multiline
              placeholder="اكتب رسالتك هنا..."
              value={userMessage}
              onChangeText={setUserMessage}
            />

            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                if (userMessage.trim().length > 0) {
                  alert("فريق بياع سوف يرد على رسالتك بأقرب وقت ممكن");
                  setUserMessage("");
                } else {
                  alert("الرجاء كتابة رسالة قبل الإرسال");
                }
              }}
            >
              <Text style={styles.sendButtonText}>إرسال</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setContactModal(false)}
            >
              <Text style={styles.cancelText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ----------------- نافذة تغيير كلمة السر ----------------- */}
      <Modal visible={passwordModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>تغيير كلمة المرور</Text>

            <Text style={styles.inputLabel}>كلمة المرور القديمة</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="أدخل كلمة المرور القديمة"
              value={oldPassword}
              onChangeText={setOldPassword}
            />

            <Text style={styles.inputLabel}>كلمة المرور الجديدة</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="أدخل كلمة المرور الجديدة"
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <Text style={styles.inputLabel}>تأكيد كلمة المرور الجديدة</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="أعد إدخال كلمة المرور"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                if (oldPassword !== currentPassword) {
                  alert("❌ كلمة المرور القديمة غير صحيحة");
                  return;
                }
                if (newPassword.length < 6) {
                  alert("❌ كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل");
                  return;
                }
                if (newPassword !== confirmPassword) {
                  alert("❌ كلمتا المرور غير متطابقتين");
                  return;
                }

                alert("✔ تم تغيير كلمة المرور بنجاح!");
                setPasswordModal(false);

                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }}
            >
              <Text style={styles.sendButtonText}>حفظ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setPasswordModal(false)}
            >
              <Text style={styles.cancelText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },

  logoContainer: { alignItems: "center", marginTop: 20, marginBottom: 15 },
  logo: { width: 140, height: 140, resizeMode: "contain" },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },

  subscriptionCard: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginTop: 10,
  },
  subscriptionLabel: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
  },

  optionButton: {
    backgroundColor: "#f5f5f5",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  optionText: {
    flex: 1,
    textAlign: "right",
    fontSize: 15,
    marginRight: 10,
    color: "#333",
  },

  section: { marginVertical: 15 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },

  logoutBtn: {
    marginVertical: 30,
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 6,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },

  subscriptionOption: { marginBottom: 20 },
  subscriptionTitle: { fontSize: 16, fontWeight: "bold" },
  subscriptionDesc: { color: "#555", marginTop: 4 },

  modalClose: { marginTop: 10 },
  cancelText: { color: "red", textAlign: "center", fontWeight: "bold" },

  userMessageInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 100,
    padding: 10,
    marginVertical: 10,
    textAlignVertical: "top",
  },

  sendButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  sendButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  inputLabel: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
});
