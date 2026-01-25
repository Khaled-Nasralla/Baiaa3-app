import { DeleteProduct } from "@/api/api-prodcuts";
import { useSignInContext } from "@/contexts/sign-in-context/sign-in-context-provider";
import { Platform, Share, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export function OptionMenu({ productId,productUserId, onClose, }: { productId : string;productUserId: string | null; onClose: () => void }) {
  const {user} = useSignInContext();

  const onDelete = async () => {
    console.log("Delete option selected");
    await DeleteProduct(productId!);
    onClose();
  };

  const onEdit = () => {
    console.log("Edit option selected");
onClose();
  };

const onShare = async () => {
  const productUrl = `https://baiaa3-app.com/product/${productId}`;
  try {
    const result = await Share.share({
      message: Platform.OS === 'ios' ? productUrl : `Check out this product: ${productUrl}`,
      url: Platform.OS === 'ios' ? productUrl : undefined,
      title: 'Check out this product',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('Shared with activity type of result.activityType');
      } else {
        console.log('Shared successfully');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dismissed');
    }
  } catch (error) {
    console.error('Error sharing product:', error);
  }

  onClose();
}

  return (
    <ThemedView style={styles.container}>
      {user?.id === productUserId && (
        <TouchableOpacity style={styles.option}>
          <ThemedText onPress={onDelete}  style={styles.text}>حذف</ThemedText>
        </TouchableOpacity>
      )}
      {user?.id === productUserId && (
      <TouchableOpacity style={styles.option}>
          <ThemedText onPress={onEdit}
          style={styles.text}>تعديل</ThemedText>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.option}>
        <ThemedText onPress={onShare}  style={styles.text}>مشاركة</ThemedText>
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
    zIndex: 101,
  },
  text:{
    zIndex: 102,
    color: "#000",

  }
});
