import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";
import { fontFamily } from "./../../styles/font-family";

export const s = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.gray[600],
  },
  description: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    marginTop: 14,
  },
});
