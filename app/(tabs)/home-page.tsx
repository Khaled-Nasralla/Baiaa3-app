import { ThemedView } from "@/components/themed-view";
import { FloatingButton } from "@/components/ui/floating-btn";
import { Serach } from "@/components/ui/search";
import { SectionsBar } from "@/components/ui/sections-bar";
import { Template } from "@/components/ui/template";
import { images } from "@/constants/images";
import { useGetProducts } from "@/contexts/get-products-context/get-products-context-provider";
import { usePagesContext } from "@/contexts/pages-context/pages-context-provider";
import { useSignInContext } from "@/contexts/sign-in-context/sign-in-context-provider";
import { Pages } from "@/enums/product-modals-options-enum";
import { useFetchProducts } from "@/hooks/fetch-products";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import homeStyles from "../(styles)/home-page-styles";



const CATEGORIES = [
  { key: "allProduts", image: images.allProduts },
  { key: "carMoto", image: images.carMoto },
  { key: "pcAndPhone", image: images.pcAndPhone },
  { key: "tools", image: images.tools },
  { key: "clothes", image: images.clothes },
  { key: "makeUp", image: images.makeUp },
  { key: "resturants", image: images.resturants },
  { key: "jobs", image: images.jobs },
  { key: "electric", image: images.electric },
  { key: "fornture", image: images.fornture },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("allProduts");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const { getProductDetails } = useGetProducts();
  const { products } = useFetchProducts();
  const { setPage } = usePagesContext();
  const { user } = useSignInContext();

  const onPress = async (prodcutId: any) => {
    await getProductDetails(prodcutId);
    router.push("/product-details");
  };


  useFocusEffect(
    useCallback(() => {
      setPage(Pages.HomePage);
    }, [])
  );
  return (
    <SafeAreaView style={homeStyles.container}>
      <Serach />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={homeStyles.sectionBar}>
        {CATEGORIES.map((item) => (
          <SectionsBar
            key={item.key}
            image={item.image}
            onPress={() => setSelectedCategory(item.key)}
          />
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={true}>
        <ThemedView style={homeStyles.grid}>
          {products.data?.map((item) =>
            <Template
              key={item.productId}
              id={item.productId}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              onPress={() => onPress(item.productId)}
              price={item.price}
              productName={item.productName}
              provinceName={item.provinceName}
              imageUrl={item.imageUrl}
              productUserId={item.userId}
            />
          )}
        </ThemedView>
      </ScrollView>
      <FloatingButton />
    </SafeAreaView>
  );
}
