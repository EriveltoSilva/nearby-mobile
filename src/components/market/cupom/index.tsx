import { colors } from "@/styles/colors";
import { IconTicket } from "@tabler/icons-react-native";
import React from "react";
import { Text, View } from "react-native";
import { s } from "./styles";

type Props = {
  code: string;
};

export const MarketCupom = ({ code }: Props) => {
  return (
    <View style={s.container}>
      <Text style={s.title}>Utilize esse cupom</Text>
      <View style={s.content}>
        <IconTicket size={24} color={colors.green.light} />
        <Text style={s.code}>{code}</Text>
      </View>
    </View>
  );
};