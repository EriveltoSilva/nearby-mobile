import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { Text, useWindowDimensions } from "react-native";

import { PlaceEntity } from "@/types/place";
import { router } from "expo-router";
import { PlaceItem } from "../place";
import { s } from "./styles";

type Props = {
  data: PlaceEntity[]; // Place[]
};

export const Places = ({ data }: Props) => {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = {
    min: 278,
    max: dimensions.height - 150,
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={s.indicator}
      backgroundStyle={s.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceItem data={item} onPress={() => router.navigate(`/market/${item.id}`)} />}
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Text style={s.title}>Explore locais perto de si</Text>}
      />
    </BottomSheet>
  );
};
