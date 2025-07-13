import { type FC, useMemo } from 'react';
import { useAllCurrencies } from '../../api';
import type { SingleCurrencyData } from '../../api/use-all-currencies';
import type { CurrencyValue } from '../types';

export const CurrencyConversionText: FC<{ value1: CurrencyValue; value2: CurrencyValue }> = ({ value1, value2 }) => {
  const { data } = useAllCurrencies();

  const currency1 = useMemo(
    () => data?.find((item) => item.short_code === value1.currencyShortChode),
    [data, value1.currencyShortChode],
  );
  const currency2 = useMemo(
    () => data?.find((item) => item.short_code === value2.currencyShortChode),
    [data, value2.currencyShortChode],
  );
  const fomratter1 = useFormatter(currency1);
  const fomratter2 = useFormatter(currency2);

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="text-sm">
        {fomratter1.format(value1.amount)} {currency1?.name} equals to
      </div>
      <div className="text-xl">
        {fomratter2.format(value2.amount)} {currency2?.name}
      </div>
    </div>
  );
};

const useFormatter = (currency?: SingleCurrencyData) => {
  return useMemo(
    () =>
      new Intl.NumberFormat(navigator.language, {
        style: 'decimal',
        minimumFractionDigits: currency?.precision ?? 0,
        maximumFractionDigits: currency?.precision ?? 0,
      }),
    [currency],
  );
};
