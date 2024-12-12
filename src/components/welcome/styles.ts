import { colors } from "@/styles/theme";
import { StyleSheet } from "react-native";
import { fontFamily } from "./../../styles/font-family";

export const s = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    marginTop: 64,
    marginBottom: 48,
  },
  title: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.gray[600],
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    marginTop: 12,
  },
});
