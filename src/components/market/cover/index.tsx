import { Button } from "@/components/button";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { router } from "expo-router";
import React from "react";
import { ImageBackground, View } from "react-native";
import { s } from "./styles";

type Props = {
  uri: string;
};

export const MarketCover = ({ uri }: Props) => {
  return (
    <ImageBackground source={{ uri }} style={s.container}>
      <View style={s.header}>
        <Button style={{ width: 40, height: 40 }} onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  );
};
