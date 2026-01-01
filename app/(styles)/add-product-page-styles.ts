import { StyleSheet } from "react-native";

const GREEN = "#69ab75ff";
const BEIGE = "#d3b78fff"; // لون المستعمل أغمق شوي
const BORDER = "#E2E2E2";
const TEXT = "#222";
const BG = "#F6F7F8";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: TEXT,
    textAlign: "right",
    marginBottom: 12,
  },

  inputStyle: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    textAlign: "right",
    marginBottom: 12,
  },

  priceInputContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  priceInput: {
    flex: 1,
    fontSize: 15,
    textAlign: "right",
  },

  currencySymbolStyle: {
    color: "#666",
    marginLeft: 8,
  },

  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 12,
    overflow: "hidden",
  },

  conditionContainer: {
    flexDirection: "row-reverse",
    gap: 12,
    marginBottom: 16,
  },

  conditionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  conditionText: {
    fontSize: 15,
    fontWeight: "600",
    color: TEXT,
  },

  imageBox: {
    height: 140,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: BORDER,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 16,
  },

  uploadIcon: {
    width: 52,
    height: 52,
    opacity: 0.6,
  },

  imagesPreviewContainer: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    marginBottom: 16,
  },

  imageWrapper: {
    margin: 6,
    position: "relative",
  },

  previewImage: {
    width: 84,
    height: 84,
    borderRadius: 14,
  },

  closeButton: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#000",
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  closeButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default styles;
