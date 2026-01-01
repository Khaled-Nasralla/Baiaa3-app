import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./(styles)/bargain-chat-styles";

type Message = {
  id: string;
  text: string;
  fromMe: boolean;
};

export default function BargainChatScreen() {
  const { userName } = useLocalSearchParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "مرحبا", fromMe: false },
    { id: "2", text: "أهلاً، كم السعر؟", fromMe: true },
  ]);

  const flatListRef = useRef<FlatList>(null);

  // تمرير تلقائي لأسفل عند إضافة رسالة
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: message, fromMe: true },
    ]);
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>مفاصلة مع {userName}</Text>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.fromMe ? styles.fromMe : styles.fromOther,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.fromMe ? styles.fromMeText : styles.fromOtherText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 12 }}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="اكتب رسالتك..."
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Text style={styles.sendBtnText}>إرسال</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
