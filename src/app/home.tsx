import { Categories } from "@/components/categories";
import { api } from "@/services/api";
import { CategoriesEntity } from "@/types/category";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";

export default function HomeScreen() {
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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Categories data={categories} onSelect={setCategory} selected={category} />
    </View>
  );
}
