import { ThemedView } from "@/components/themed-view";
import { useSignUPContext } from "@/contexts/sign-up-context/sign-up-context-provider";
import { useState } from "react";
import { Alert, ImageBackground, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./(styles)/sign-up-styles";

export default function SignUpPage() {
const [name,setName]=useState("");
const [surname,setSurname]=useState("");
const [password,setPassword]=useState("");
const [emailAddress,setEmailAddress]=useState("");
const [confirmPassword,setConfirmPassword]= useState("")
const {signUp,error,loading}=useSignUPContext();
 const handleSignUp = async () => {
  if(confirmPassword != password){
    Alert.alert("passwod does not match")
    return;
  }
     await signUp({ id:"",name : name, surName :surname, emailAddress : emailAddress,  password:password })
     
      alert(error);
  };
  return (
       <ImageBackground
         style={styles.bg}
          source={require("../assets/images/backgroundphoto.jpg")}
        >
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <TextInput style={styles.inputStyles} placeholder="الاسم" onChangeText={setName} value={name}  />
        <TextInput style={styles.inputStyles} placeholder="الكنية" onChangeText={setSurname} value={surname} />
        <TextInput style={styles.inputStyles} placeholder="الأيميل" onChangeText={setEmailAddress} value={emailAddress}/>
        <TextInput style={styles.inputStyles} placeholder="كلمة المرور" secureTextEntry onChangeText={setPassword} value={password} />
        <TextInput style={styles.inputStyles} placeholder="تأكيد كلمة المرور" secureTextEntry onChangeText={setConfirmPassword} value={confirmPassword} />

        <ThemedView style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnStyle} onPress={handleSignUp}>
            <Text style={styles.textBtn}>تسجيل إشتراك</Text>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
    </ImageBackground>
  );
}

