import { images } from "@/constants/images";
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
  const [userMessage, setUserMessage] = useState("");

  return (
    <ScrollView style={styles.container}>
      
      {/* ------- اللوغو ------- */}
      <View style={styles.logoContainer}>
        <Image
          source={images.logo} 
          style={styles.logo}
        />
      </View>

      {/* ------- تعديل كلمة السر ------- */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>تعديل كلمة السر</Text>
      </TouchableOpacity>

      {/* ------- حالة الاشتراك ------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>حالة الاشتراك</Text>
        <Text style={styles.subscriptionText}>
          {subscriptionType === "free"
            ? "الحساب العادي (مجاني)"
            : subscriptionType === "gold"
            ? "الاشتراك الذهبي"
            : "اشتراك الشركات"}
        </Text>
      </View>

      {/* ------- تغيير الاشتراك ------- */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setSubscriptionModal(true)}
      >
        <Text style={styles.buttonText}>تغيير الاشتراك</Text>
      </TouchableOpacity>

      {/* ------- شروط الاستخدام و سياسة الخصوصية ------- */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>شروط الاستخدام و سياسة الخصوصية</Text>
      </TouchableOpacity>

      {/* ------- مركز المساعدة ------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>مركز المساعدة</Text>

        <TouchableOpacity
          style={styles.contactBtn}
          onPress={() => setContactModal(true)}
        >
          <Text style={styles.buttonText}>تواصل معنا</Text>
        </TouchableOpacity>
      </View>

      {/* ------- تسجيل الخروج ------- */}
      <TouchableOpacity style={styles.logoutBtn}>
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
              textAlignVertical="top"
            />

            {/* زر الإرسال */}
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                if (userMessage.trim().length > 0) {
                  alert("فريق بياع سوف يرد على رسالتك بأقرب وقت ممكن");
                  setUserMessage(""); // مسح الحقل بعد الإرسال
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },

  logoContainer: { alignItems: "center", marginTop: 30, marginBottom: 15 },
  logo: { width: 140, height: 140, resizeMode: "contain" },

  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonText: { color: "#fff", textAlign: "center" },

  section: { marginVertical: 15 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  subscriptionText: { fontSize: 15 },

  cancelBtn: {
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  cancelText: { color: "#ff4444", textAlign: "center", fontWeight: "bold" },

  logoutBtn: { marginVertical: 30 },
  logoutText: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
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

  contactBtn: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  subscriptionOption: { marginBottom: 20 },
  subscriptionTitle: { fontSize: 16, fontWeight: "bold" },
  subscriptionDesc: { color: "#555" },

  modalClose: { marginTop: 10 },

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
});
