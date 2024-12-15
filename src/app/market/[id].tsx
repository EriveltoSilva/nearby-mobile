import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { MarketCover } from "@/components/market/cover";
import { MarketCupom } from "@/components/market/cupom";
import { MarketDetail } from "@/components/market/detail";
import { api } from "@/services/api";
import { MarketDetailEntity } from "@/types/marketDetail";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native";

export default function MarketDetailScreen() {
  const qrLock = useRef(false);
  const params = useLocalSearchParams();
  const [_, requestPermission] = useCameraPermissions();

  const [cupom, setCupom] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingCupom, setIsLoadingCupom] = useState<boolean>(true);
  const [marketData, setMarketData] = useState<MarketDetailEntity | null>();
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState<boolean>(false);

  const fetchMarket = async () => {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setMarketData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possivel carregar os dados do Local", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  };

  const handleOpenCameras = async () => {
    try {
      const { granted } = await requestPermission();
      if (!granted)
        return Alert.alert("Permissão de câmera", "Você precisa permitir acessar a câmera para ler QR Code");
      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro de Câmera", "Não foi possivel abrir a câmera");
    }
  };

  const handleUseCupom = (id: string) => {
    setIsVisibleCameraModal(false);
    Alert.alert("Cupom", `Não é possivel usar um cupom já resgatado! Deseja realmente resgatar este cupom?`, [
      {
        style: "cancel",
        text: "Não",
      },
      {
        text: "Sim",
        onPress: () => getCupom(id),
      },
    ]);
  };

  const getCupom = async (id: string) => {
    try {
      setIsLoadingCupom(true);
      const { data } = await api.patch(`/coupons/${id}`);
      Alert.alert("Coupons", data.coupon);
      setCupom(data.coupon);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possivel utilizar o cupom!");
    } finally {
      setIsLoadingCupom(false);
    }
  };

  useEffect(() => {
    fetchMarket();
  }, [params.id, cupom]);

  if (isLoading || !marketData) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="default" hidden={isVisibleCameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <MarketCover uri={marketData.cover} />
        <MarketDetail data={marketData} />
      </ScrollView>

      {cupom && <MarketCupom code={cupom} />}

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCameras}>
          <Button.Text>Ler QR Code</Button.Text>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => handleUseCupom(data), 500);
            }
          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button onPress={() => setIsVisibleCameraModal(false)} isLoading={!isLoadingCupom}>
            <Button.Text>Voltar</Button.Text>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
