import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export function SectionsBar({ image }: { image: any }) {
  return    <TouchableOpacity onPress={ () =>console.log("hell yeah")}>
      <Image source={image} style={styles.image} />
    </TouchableOpacity>;
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginRight: 5,
    marginBottom:30,
    borderRadius: 10,
  },
});
