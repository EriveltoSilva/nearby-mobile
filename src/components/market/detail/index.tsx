import { MarketDetailEntity } from "@/types/marketDetail";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";
import React from "react";
import { Text, View } from "react-native";
import { MarketInfo } from "../info";
import { s } from "./styles";

type Props = {
  data: MarketDetailEntity;
};

export const MarketDetail = ({ data }: Props) => {
  return (
    <View style={s.container}>
      <Text style={s.name}>{data.name}</Text>
      <Text style={s.description}>{data.description}</Text>

      <View style={s.group}>
        <Text style={s.title}>Informações</Text>

        <MarketInfo icon={IconTicket} description={`${data.coupons} cupons disponiveis`} />
        <MarketInfo icon={IconMapPin} description={data.address} />
        <MarketInfo icon={IconPhone} description={data.phone} />
      </View>

      <View style={s.group}>
        <Text style={s.title}>Regras</Text>
        {data?.rules?.map((item) => (
          <Text key={item.id}>{`\u2022 ${item.description}`}</Text>
        ))}
      </View>
    </View>
  );
};
