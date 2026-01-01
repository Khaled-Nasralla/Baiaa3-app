import { images } from "@/constants/images";
import { useSignInContext } from "@/contexts/sign-in-context/sign-in-context-provider";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../(styles)/settings";

/* ================= Types ================= */
type SubscriptionType = "free" | "gold" | "business";

export default function SettingsScreen() {
  /* ================= State ================= */
  const [subscriptionType, setSubscriptionType] =
    useState<SubscriptionType>("free");

  const [subscriptionModal, setSubscriptionModal] = useState<boolean>(false);
  const [contactModal, setContactModal] = useState<boolean>(false);
  const [passwordModal, setPasswordModal] = useState<boolean>(false);

  const [userMessage, setUserMessage] = useState<string>("");

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { signOut } = useSignInContext();

  const currentPassword = "123456"; // تجريبي

  /* ================= Helpers ================= */
  const getSubscriptionText = (): string => {
    switch (subscriptionType) {
      case "gold":
        return "الاشتراك الذهبي";
      case "business":
        return "اشتراك الشركات";
      default:
        return "الحساب المجاني";
    }
  };

  const getSubscriptionIcon = (): any => {
    switch (subscriptionType) {
      case "gold":
        return "trophy-outline";
      case "business":
        return "briefcase-outline";
      default:
        return "person-outline";
    }
  };

  const handleSignOut = (): void => {
    signOut();
    router.replace("/sign-in-page");
  };

  const handleSubscriptionSelect = async (
    type: SubscriptionType
  ): Promise<void> => {
    await AsyncStorage.setItem("pendingSubscription", type);
    setSubscriptionType(type);
    setSubscriptionModal(false);
    router.replace("/payment-method"); 
  };

  /* ================= UI ================= */
  return (
    <ScrollView style={styles.container}>
      {/* ---------- Logo ---------- */}
      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logo} />

        <View style={styles.subscriptionCard}>
          <Ionicons name={getSubscriptionIcon()} size={24} color="#fff" />
          <Text style={styles.subscriptionLabel}>
            {getSubscriptionText()}
          </Text>
        </View>
      </View>

      {/* ---------- Change Password ---------- */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => setPasswordModal(true)}
      >
        <Ionicons name="lock-closed-outline" size={22} color="#007bff" />
        <Text style={styles.optionText}>تعديل كلمة السر</Text>
      </TouchableOpacity>

      {/* ---------- Change Subscription ---------- */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => setSubscriptionModal(true)}
      >
        <Ionicons name="wallet-outline" size={22} color="#007bff" />
        <Text style={styles.optionText}>تغيير الاشتراك</Text>
      </TouchableOpacity>

      {/* ---------- Terms ---------- */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => router.push("/terms")}
      >
        <Ionicons
          name="document-text-outline"
          size={22}
          color="#007bff"
        />
        <Text style={styles.optionText}>
          شروط الاستخدام و سياسة الخصوصية
        </Text>
      </TouchableOpacity>

      {/* ---------- Help Center ---------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>مركز المساعدة</Text>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setContactModal(true)}
        >
          <Ionicons
            name="chatbox-ellipses-outline"
            size={22}
            color="#007bff"
          />
          <Text style={styles.optionText}>تواصل معنا</Text>
        </TouchableOpacity>
      </View>

      {/* ---------- Logout ---------- */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={22} color="red" />
        <Text style={styles.logoutText}>تسجيل الخروج</Text>
      </TouchableOpacity>

      {/* ================= Subscription Modal ================= */}
      <Modal visible={subscriptionModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.subscriptionModalBox}>
            <Text style={styles.modalTitle}>اختر نوع الاشتراك</Text>

            <TouchableOpacity
              style={[styles.subscriptionOption, styles.freeOption]}
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
              style={[styles.subscriptionOption, styles.goldOption]}
              onPress={() => handleSubscriptionSelect("gold")}
            >
              <Text style={styles.subscriptionTitle}>الاشتراك الذهبي – 7$</Text>
              <Text style={styles.subscriptionDesc}>
                نشر 15 منشور – ظهور أعلى الصفحة
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.subscriptionOption, styles.businessOption]}
              onPress={() => handleSubscriptionSelect("business")}
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

      {/* ================= Contact Modal ================= */}
      <Modal visible={contactModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>تواصل معنا</Text>

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
                if (!userMessage.trim()) {
                  alert("الرجاء كتابة رسالة");
                  return;
                }
                alert("سيتم الرد عليك بأقرب وقت");
                setUserMessage("");
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

      {/* ================= Password Modal ================= */}
      <Modal visible={passwordModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>تغيير كلمة المرور</Text>

            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="كلمة المرور القديمة"
              value={oldPassword}
              onChangeText={setOldPassword}
            />

            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="كلمة المرور الجديدة"
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="تأكيد كلمة المرور"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                if (oldPassword !== currentPassword) {
                  alert("كلمة المرور القديمة غير صحيحة");
                  return;
                }
                if (newPassword.length < 6) {
                  alert("كلمة المرور قصيرة");
                  return;
                }
                if (newPassword !== confirmPassword) {
                  alert("كلمتا المرور غير متطابقتين");
                  return;
                }

                alert("تم تغيير كلمة المرور بنجاح");
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
