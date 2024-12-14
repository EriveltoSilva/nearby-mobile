import { Categories } from "@/components/categories";
import { api } from "@/services/api";
import { CategoriesEntity } from "@/types/category";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";

export default function HomeScreen() {
  const [category, setCategory] = useState<string>("");
  const [markets, setMarkets] = useState<CategoriesEntity[]>([]);
  const [categories, setCategories] = useState<CategoriesEntity[]>([]);

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
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.error(error);
      Alert.alert("Locais", "Não foi possível carregar os locais!");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Categories data={categories} onSelect={setCategory} selected={category} />
    </View>
  );
}
