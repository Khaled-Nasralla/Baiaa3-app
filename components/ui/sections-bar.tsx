import { Image, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  image: any;
  onPress: () => void;
};

export function SectionsBar({ image, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={image} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginRight: 5,
    marginBottom: 30,
    borderRadius: 10,
  },
});
