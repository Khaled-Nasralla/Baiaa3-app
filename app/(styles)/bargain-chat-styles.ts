import { Dimensions, StyleSheet } from "react-native";

const GREEN = "#69AB75";        // لون الرسائل الصادرة
const LIGHT_GRAY = "#E5E5E5";   // لون الرسائل القادمة
const WHITE = "#fff";
const TEXT_COLOR = "#222";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },

  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    color: TEXT_COLOR,
  },

  messageBubble: {
    maxWidth: width * 0.75,
    marginVertical: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },

  fromMe: {
    alignSelf: "flex-end",
    backgroundColor: GREEN,
    borderTopRightRadius: 0,
  },
  fromOther: {
    alignSelf: "flex-start",
    backgroundColor: LIGHT_GRAY,
    borderTopLeftRadius: 0,
  },

  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },

  fromMeText: {
    color: WHITE,
  },
  fromOtherText: {
    color: TEXT_COLOR,
  },

  inputContainer: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    backgroundColor: WHITE,
    alignItems: "center",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 8,
    color: TEXT_COLOR,
    backgroundColor: "#F9F9F9",
  },

  sendBtn: {
    backgroundColor: GREEN,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  sendBtnText: {
    color: WHITE,
    fontWeight: "600",
  },
});

export default styles;
