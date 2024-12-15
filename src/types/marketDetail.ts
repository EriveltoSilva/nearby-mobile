export type MarketDetailEntity = {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: string;
  categoryId: string;
  cover: string;
  latitude: number;
  longitude: number;
  rules: { description: string; id: string; marketId: string }[];
};
