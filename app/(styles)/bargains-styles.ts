import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F8",
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "right",
    marginBottom: 16,
    color: "#111",
  },

  tabs: {
    flexDirection: "row-reverse",
    gap: 8,
    marginBottom: 18,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#EAEAEA",
    alignItems: "center",
  },

  tabActive: {
    backgroundColor: "#0A2540",
  },

  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },

  tabTextActive: {
    color: "#fff",
  },

  card: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },

  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginLeft: 12,
    backgroundColor: "#ddd",
  },

  cardInfo: {
    flex: 1,
    alignItems: "flex-end",
  },

  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  userName: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },

  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  incoming: {
    backgroundColor: "#FFE8A3",
  },

  outgoing: {
    backgroundColor: "#D6E4FF",
  },

  active: {
    backgroundColor: "#C7F0D8",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#222",
  },
});
