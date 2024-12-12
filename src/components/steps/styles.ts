import { colors } from "@/styles/theme";
import { StyleSheet } from "react-native";
import { fontFamily } from "./../../styles/font-family";

export const s = StyleSheet.create({
  container: {
    gap: 24,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },
});