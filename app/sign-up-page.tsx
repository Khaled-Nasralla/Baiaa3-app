import { ThemedView } from "@/components/themed-view";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpPage() {
  return (
       <ImageBackground
         style={styles.bg}
          source={require("../assets/images/backgroundphoto.jpg")}
        >
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <TextInput style={styles.inputStyles} placeholder="الاسم" />
        <TextInput style={styles.inputStyles} placeholder="الكنية" />
        <TextInput style={styles.inputStyles} placeholder="الأيميل"/>
        <TextInput style={styles.inputStyles} placeholder="كلمة المرور" secureTextEntry />
        <TextInput style={styles.inputStyles} placeholder="تأكيد كلمة المرور" secureTextEntry />

        <ThemedView style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnStyle}>
            <Text style={styles.textBtn}>تسجيل إشتراك</Text>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
     flex: 1,
    },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#ffffffff",
  },
  inputStyles: {
    marginVertical: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
  },
  btnContainer: {
    marginTop: 20,
    alignItems: "center",
     backgroundColor: "#ffffffff",
  },
  btnStyle: {
    borderRadius: 10,
    backgroundColor: "#6BC7F5",
    width: "50%",
    padding: 12,
    alignItems: "center",
  },
  textBtn: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
