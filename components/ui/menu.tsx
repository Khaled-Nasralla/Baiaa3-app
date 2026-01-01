import { useSignInContext } from "@/contexts/sign-in-context/sign-in-context-provider";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export function OptionMenu({ productUserId }: { productUserId: string | null }) {
  const {user} = useSignInContext();

  return (
    <ThemedView style={styles.container}>
      {user?.id === productUserId && (
        <TouchableOpacity style={styles.option}>
          <ThemedText>حذف المنتج</ThemedText>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.option}>
        <ThemedText>مشاركة</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  option: {
    paddingVertical: 10,
  },
});
