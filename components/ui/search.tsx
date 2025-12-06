import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "./icon-symbol";

export function Serach() {
  return (
    <ThemedView style={styles.container}>
      {/* حاوية البحث */}
      <ThemedView style={styles.searchBox}>
        
        <TouchableOpacity style={styles.filterBtn} onPress={() => console.log("Filter Pressed")}>
          <IconSymbol name="line.3.horizontal.decrease" size={28} color="#5e5c5cff" /> 
        </TouchableOpacity>

        <TextInput
          placeholder="ابحث..."
          style={styles.input}
        />


      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
  },
  filterBtn: {

 },
});
