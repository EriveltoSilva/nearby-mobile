import { IconProps } from "@tabler/icons-react-native";
import React from "react";
import { Text, View } from "react-native";

import { colors } from "@/styles/colors";
import { s } from "./styles";

type Props = { description: string; icon: React.ComponentType<IconProps> };

export const MarketInfo = ({ description, icon: Icon }: Props) => {
  return (
    <View style={s.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={s.text}>{description}</Text>
    </View>
  );
};
