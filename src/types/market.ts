import { PlaceEntity } from "./place";

export type MarketEntity = PlaceEntity & {
  latitude: number;
  longitude: number;
};
