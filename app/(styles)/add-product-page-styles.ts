import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  imageBox: {
    width: '100%',
    height: 140,
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  uploadText: {
    fontSize: 14,
    color: '#555',
  },
  inputStyle: {
    margin: 5,
    padding: 10,
    color: "#1b8bff",
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    justifyContent:"center",
    alignContent:"center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  priceInputContainer: {
    flexDirection: "row-reverse",
    justifyContent:"space-between",
    alignItems: "center",
    padding: 10,
  },
  currencySymbolStyle: {
    fontSize: 16,
    color: "#555",
    marginRight: 8
  },
  imagePickerButton: {
    backgroundColor: "#1b8bff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10
  },
  imagePickerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  imagesPreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 10
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    margin: 5
  },
  imageWrapper: { 
    position: 'relative',
    margin: 5,
  },
  closeButton: {       // زر ×
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {   // نص × داخل الزر
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
