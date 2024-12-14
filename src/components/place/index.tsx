import { colors } from "@/styles/theme";
import { PlaceEntity } from "@/types/place";
import { IconTicket } from "@tabler/icons-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { s } from "./styles";

type PlaceProps = TouchableOpacityProps & {
  data: PlaceEntity;
};

export const PlaceItem = ({ data, ...rest }: PlaceProps) => {
  return (
    <TouchableOpacity style={s.container} {...rest}>
      <Image style={s.image} source={{ uri: data.cover }} />

      <View style={s.content}>
        <Text style={s.name}>{data.name}</Text>
        <Text numberOfLines={2} style={s.description}>
          {data.description}
        </Text>
        <View style={s.footer}>
          <IconTicket size={16} color={colors.red.base} />
          <Text style={s.tickets}>{data.coupons} cupons disponiveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
