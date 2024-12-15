import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

import { Categories } from "@/components/categories";
import { Places } from "@/components/places";
import { api } from "@/services/api";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { CategoriesEntity } from "@/types/category";
import { MarketEntity } from "@/types/market";
import { router } from "expo-router";

const fixedLocation = {
  //Angola
  latitude: -8.920744,
  longitude: 13.3789928,
};

const currentLocation = {
  // Brasil
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

export default function HomeScreen() {
  const [markets, setMarkets] = useState<MarketEntity[]>([]);
  const [categories, setCategories] = useState<CategoriesEntity[]>([]);
  const [category, setCategory] = useState<string>("");
  // const [currentLocation, setCurrentLocation] = useState<Coordinate | null>(null);

  // const getCurrentLocation = async () => {
  //   try {
  //     let { granted } = await Location.requestForegroundPermissionsAsync();
  //     if (!granted) {
  //       Alert.alert("GPS", "Ative a localização por GPS, por favor!");
  //       return;
  //     }
  //     const location = (await Location.getCurrentPositionAsync({})) as Location.LocationObject;
  //     setCurrentLocation((prev) => ({ ...location.coords }));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  console.log("AQUI", currentLocation);

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
    // getCurrentLocation();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ccc" }}>
      <Categories data={categories} onSelect={setCategory} selected={category} />

      {currentLocation && (
        <MapView
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={{ flex: 1, width: "100%", height: "100%" }}
        >
          <Marker
            identifier="current"
            coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
            image={require("@/assets/location.png")}
          />
          {markets?.map((item) => (
            <Marker
              key={item.id}
              identifier={item.id}
              coordinate={{ latitude: item.latitude, longitude: item.longitude }}
              image={require("@/assets/pin.png")}
            >
              <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
                <View>
                  <Text style={{ fontSize: 14, color: colors.gray[600], fontFamily: fontFamily.medium }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.gray[600], fontFamily: fontFamily.regular }}>
                    {item.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
      <Places data={markets} />
    </View>
  );
}
