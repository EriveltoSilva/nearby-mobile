import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { Categories } from "@/components/categories";
import { Places } from "@/components/places";
import { api } from "@/services/api";
import { CategoriesEntity } from "@/types/category";
import { MarketEntity } from "@/types/market";

export default function HomeScreen() {
  const [markets, setMarkets] = useState<MarketEntity[]>([]);
  const [categories, setCategories] = useState<CategoriesEntity[]>([]);
  const [category, setCategory] = useState<string>("");

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.error(error);
      Alert.alert("Categorias", "Não foi possível carregar as categorias");
    }
  };

  const fetchMarkets = async () => {
    if (!category) return;
    try {
      const { data } = await api.get(`/markets/category/${category}`);
      setMarkets(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Locais", "Não foi possível carregar os locais!");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ccc" }}>
      <Categories data={categories} onSelect={setCategory} selected={category} />
      <Places data={markets} />
    </View>
  );
}
