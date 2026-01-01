import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./(styles)/bargains-styles";

type BargainStatus = "incoming" | "outgoing" | "active";

const MOCK_DATA = [
  { id: "1", productName: "iPhone 13", userName: "أحمد", image: "https://via.placeholder.com/80", status: "incoming" },
  { id: "2", productName: "لابتوب Dell", userName: "محمد", image: "https://via.placeholder.com/80", status: "outgoing" },
  { id: "3", productName: "ساعة Apple", userName: "سارة", image: "https://via.placeholder.com/80", status: "active" },
];

export default function BargainsScreen() {
  const [activeTab, setActiveTab] = useState<BargainStatus>("incoming");
  const [data, setData] = useState(MOCK_DATA);

  const filteredData = data.filter((item) => item.status === activeTab);

  const handleIncomingPress = (item: any) => {
    Alert.alert(
      "طلب مفاصلة",
      `هل تريد قبول طلب المفاصلة من ${item.userName}؟`,
      [
        {
          text: "رفض",
          style: "destructive",
          onPress: () => {
            console.log(`رفضت المفاصلة مع ${item.userName}`);
            // تحديث الحالة محلياً لإزالة الواردة
            setData((prev) =>
              prev.map((d) =>
                d.id === item.id ? { ...d, status: "rejected" } : d
              )
            );
          },
        },
        {
          text: "موافقة",
          onPress: () => {
            console.log(`تمت الموافقة على المفاصلة مع ${item.userName}`);
            // تحديث الحالة محلياً لتصبح مفتوحة
            setData((prev) =>
              prev.map((d) =>
                d.id === item.id ? { ...d, status: "active" } : d
              )
            );
            // تحويل المستخدم لصفحة الدردشة
            router.push({
              pathname: "/bargain-chat",
              params: { id: item.id },
            });
          },
        },
      ]
    );
  };

  const handlePress = (item: any) => {
    if (item.status === "incoming") {
      handleIncomingPress(item);
    } else if (item.status === "active") {
      router.push({
        pathname: "/bargain-chat",
        params: { id: item.id },
      });
    } else {
      console.log("بانتظار رد المستخدم الآخر");
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => handlePress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardInfo}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.userName}>
          {item.status === "incoming"
            ? `طلب مفاصلة من ${item.userName}`
            : item.status === "outgoing"
            ? `بانتظار رد ${item.userName}`
            : `مفاصلة مع ${item.userName}`}
        </Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          item.status === "incoming"
            ? styles.incoming
            : item.status === "outgoing"
            ? styles.outgoing
            : styles.active,
        ]}
      >
        <Text style={styles.badgeText}>
          {item.status === "incoming"
            ? "وارد"
            : item.status === "outgoing"
            ? "صادر"
            : "مفتوحة"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>المفاصلات</Text>

      <View style={styles.tabs}>
        <Tab title="الواردة" active={activeTab === "incoming"} onPress={() => setActiveTab("incoming")} />
        <Tab title="الصادرة" active={activeTab === "outgoing"} onPress={() => setActiveTab("outgoing")} />
        <Tab title="المفتوحة" active={activeTab === "active"} onPress={() => setActiveTab("active")} />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const Tab = ({ title, active, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.tabButton, active && styles.tabActive]}
  >
    <Text style={[styles.tabText, active && styles.tabTextActive]}>{title}</Text>
  </TouchableOpacity>
);
