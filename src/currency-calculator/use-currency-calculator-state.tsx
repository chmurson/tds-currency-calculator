import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useConvertCurrencies } from '../api';
import type { CurrencyValue } from './types';

export const useCurrencyCalculatorState = ({ defaultCurrencies }: { defaultCurrencies: [string, string] }) => {
  const [conversionType, setConverstionType] = useConvertionTypeState();

  const [value1, setValue1] = useCurrencyState({
    amount: 1,
    currencyShortChode: defaultCurrencies[0],
  });
  const [value2, setValue2] = useCurrencyState({
    amount: 0,
    currencyShortChode: defaultCurrencies[1],
  });

  useHandleConversion({
    conversionType,
    onChangeAmount: (amount, which) => {
      if (which === 'first') {
        setValue1((prev) => ({ ...prev, amount }));
      } else {
        setValue2((prev) => ({ ...prev, amount }));
      }
    },
    values: [value1, value2],
  });

  const handleChange1 = useCallback(
    (value: CurrencyValue) => {
      setValue1(value);
      setConverstionType('first->second');
    },
    [setValue1, setConverstionType],
  );

  const handleChange2 = useCallback(
    (value: CurrencyValue) => {
      setValue2(value);
      setConverstionType('second->first');
    },
    [setValue2, setConverstionType],
  );

  return {
    value1,
    value2,
    onChangeValue1: handleChange1,
    onChangeValue2: handleChange2,
  };
};

const useConvertionTypeState = () => {
  return useState<'first->second' | 'second->first'>('first->second');
};

function useCurrencyState(defaultValue: CurrencyValue) {
  return useState<CurrencyValue>(defaultValue);
}

function useHandleConversion({
  conversionType,
  onChangeAmount,
  values,
}: {
  values: [CurrencyValue, CurrencyValue];
  conversionType: 'first->second' | 'second->first';
  onChangeAmount: (amount: number, which: 'first' | 'second') => void;
}) {
  const [value1, value2] = values;

  const conversionPayload = useMemo(() => {
    if (conversionType === 'first->second') {
      return {
        from: value1.currencyShortChode,
        to: value2.currencyShortChode,
        amount: value1.amount,
      };
    }

    return {
      from: value2.currencyShortChode,
      to: value1.currencyShortChode,
      amount: value2.amount,
    };
  }, [conversionType, value1, value2]);

  const { data } = useConvertCurrencies(conversionPayload);
  const onChangeAmountRef = useRef(onChangeAmount);
  onChangeAmountRef.current = onChangeAmount;

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.from === value1.currencyShortChode && data.to === value2.currencyShortChode) {
      onChangeAmountRef.current(data.value, 'second');
    } else if (data.from === value2.currencyShortChode && data.to === value1.currencyShortChode) {
      onChangeAmountRef.current(data.value, 'first');
    }
  }, [data, value1.currencyShortChode, value2.currencyShortChode]);
}
