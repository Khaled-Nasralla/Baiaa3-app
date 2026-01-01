import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  overlay: { ...StyleSheet.absoluteFillObject },
  header: { alignItems: "center", marginTop: 40 },
  headerText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginTop: 5 },
  
  // الإطار الدائري للهوية
  frame: {
    position: "absolute",
    top: height / 2 - 100,
    left: width / 2 - 150,
    width: 300,
    height: 200,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.7)",
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.1)",
  },

  // الإطار الدائري للسيلفي
  selfieFrame: {
    top: height / 2 - 100,
    left: width / 2 - 100,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: "rgba(0,255,0,0.7)",
    backgroundColor: "rgba(0,0,0,0.1)",
  },

  preview: {
    position: "absolute",
    borderRadius: 12,
  },

  bottom: { position: "absolute", bottom: 50, width: "100%", alignItems: "center" },
  captureButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: "white", justifyContent: "center", alignItems: "center" },
  innerButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#007bff" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  permissionText: { fontSize: 16, marginBottom: 10, textAlign: "center" },
  permissionButton: { backgroundColor: "#6BC7F5", padding: 12, borderRadius: 10, width: "50%", alignItems: "center" },
  permissionButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  loader: { padding: 20, backgroundColor: "#fff", borderRadius: 10 },
  loaderText: { fontSize: 16, fontWeight: "bold", color: "#000" },
});

export default styles;
