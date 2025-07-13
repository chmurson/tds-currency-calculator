import useSWR from "swr";
import { type BaiscCurrencyBeaconType, jsonFetcher } from "./core";

export type SingleCurrencyData = {
  id: string;
  name: string;
  short_code: string;
  code: string;
  precision: number;
};

export function useAllCurrencies() {
  const { data, error, isLoading } = useSWR("/v1/currencies", jsonFetcher);

  const { response, meta } = (data as BaiscCurrencyBeaconType<SingleCurrencyData[]>) ?? {
    data: undefined,
    meta: undefined,
  };

  return { data: response, meta, error, isLoading };
}
