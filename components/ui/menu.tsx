import { usePagesContext } from "@/contexts/pages-context/pages-context-provider";
import { Pages } from "@/enums/product-modals-options-enum";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export function OptionMenu() {
  const { page } = usePagesContext();

  return (
    <ThemedView style={styles.container}>
      {page === Pages.MyProfile && (
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
