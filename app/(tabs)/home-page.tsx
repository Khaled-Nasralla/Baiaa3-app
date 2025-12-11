import { FloatingButton } from '@/components/ui/floating-btn';
import { Serach } from '@/components/ui/search';
import { SectionsBar } from '@/components/ui/sections-bar';
import { Template } from '@/components/ui/template';
import { images } from '@/constants/images';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {

const onPress =  () => {
 router.push("/productDetails")
}
  return (
    <SafeAreaView style={styles.container}>
       <Serach />

<ScrollView horizontal showsHorizontalScrollIndicator={false} style={ styles.sectionBar }>

  <SectionsBar image={images.allProduts} />
  <SectionsBar image={images.carMoto} />
  <SectionsBar image={images.pcAndPhone}/>
  <SectionsBar image={images.tools}/>
  <SectionsBar image={images.clothes}/>
  <SectionsBar image={images.makeUp}/>
  <SectionsBar image={images.resturants}/>


</ScrollView>


      <ScrollView showsVerticalScrollIndicator={true}>
       
        <View style={styles.grid}>
          <Template onPress ={onPress} />
          <Template onPress ={onPress} />
          <Template onPress ={onPress} />
          <Template onPress ={onPress} />
          <Template onPress ={onPress} />
          <Template onPress ={onPress} />
          <Template onPress ={onPress} />
          <Template onPress ={onPress} />
        </View>
      </ScrollView>

      <FloatingButton />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "white",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  sectionBar:{
    elevation:10,
    shadowOpacity:20,
    backgroundColor:"white",
    borderRadius:10
  }
});
