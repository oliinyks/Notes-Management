import { StyleSheet } from "react-native";
import { COLORS } from "./сolors";

export const gStyle = StyleSheet.create({
  input: {
    backgroundColor: COLORS.inputLite,
    minHeight: 48,
    paddingHorizontal: 24,
    paddingVertical: 5,
    alignItems: "center",

    color: COLORS.textPrimary,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "RobotoRegular",
  },
});
