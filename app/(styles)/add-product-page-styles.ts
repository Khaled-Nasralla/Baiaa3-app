import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    textAlign: "right",
    marginTop: 24,
    marginBottom: 12,
  },

  inputStyle: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#d6d6d6",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#222",
    marginBottom: 12,
    textAlign: "right",
  },

  textArea: {
    height: 90,
    textAlignVertical: "top",
  },

  priceInputContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#d6d6d6",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  priceInput: {
    flex: 1,
    fontSize: 15,
    textAlign: "right",
  },

  currencySymbolStyle: {
    fontSize: 15,
    color: "#444",
    marginLeft: 8,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#d6d6d6",
    borderRadius: 14,
    backgroundColor: "#f9f9f9",
    marginBottom: 12,
    overflow: "hidden",
  },

  picker: {
    height: 50,
    direction: "rtl",
  },

  imageBox: {
    height: 140,
    borderWidth: 1,
    borderColor: "#d6d6d6",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    backgroundColor: "#f9f9f9",
  },

  uploadIcon: {
    width: 56,
    height: 56,
    resizeMode: "contain",
  },

  imagesPreviewContainer: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    marginBottom: 16,
  },

  imageWrapper: {
    position: "relative",
    margin: 6,
  },

  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },

  closeButton: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#ff3b30",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },

  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  submitButton: {
    backgroundColor: "#1b8bff",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },

  submitButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});


export default styles;
