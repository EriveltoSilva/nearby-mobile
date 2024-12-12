import { CategoriesEntity } from "@/types/category";
import React from "react";
import { FlatList } from "react-native";
import { CategoryItem } from "../categoryItem";
import { s } from "./styles";

type CategoriesProps = {
  data: CategoriesEntity[];
  selected: string;
  onSelect: (categoryId: string) => void;
};

export const Categories = ({ data, selected, onSelect }: CategoriesProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CategoryItem
          iconId={item.id}
          name={item.name}
          onPress={() => onSelect(item.id)}
          isSelected={item.id === selected}
        />
      )}
      horizontal
      contentContainerStyle={s.content}
      style={s.container}
      showsHorizontalScrollIndicator={false}
    />
  );
};
