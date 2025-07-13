import useSWR from "swr";
import { type BaiscCurrencyBeaconType, jsonFetcher } from "./core";

type Payload = {
  from: string;
  to: string;
  amount: number;
};

export type CurrencyConversionData = {
  date: string;
  from: string;
  to: string;
  value: number;
};

export const useConvertCurrencies = (payload?: Payload) => {
  const { data, error, isLoading } = useSWR(
    payload ? `/v1/convert?${getParamsString(payload)}` : undefined,
    jsonFetcher,
  );
  const { response, meta } = (data as BaiscCurrencyBeaconType<CurrencyConversionData>) ?? {
    data: undefined,
    meta: undefined,
  };

  return { data: response, meta, error, isLoading };
};

function getParamsString(args: Payload) {
  const { amount, from, to } = args;
  const urlSearchParams = new URLSearchParams({
    from,
    to,
    amount: amount.toString(10),
  });

  return urlSearchParams.toString();
}
