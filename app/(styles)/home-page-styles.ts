import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
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

export default homeStyles;
