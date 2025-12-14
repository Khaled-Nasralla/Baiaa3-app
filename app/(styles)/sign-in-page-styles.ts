import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    alignItems: "center",
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
    resizeMode: "contain",
  },

  input: {
    width: "100%",
    backgroundColor: "#F0F0F0",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    fontSize: 16,
    marginTop: 15,
  },

  primaryBtn: {
    width: "100%",
    backgroundColor: "#6BC7F5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  primaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
    justifyContent: "center",
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDD",
  },

  dividerText: {
    marginHorizontal: 10,
    color: "#777",
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  secondaryBtn: {
    backgroundColor: "#EDEDED",
    paddingVertical: 12,
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
  },

  secondaryText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
