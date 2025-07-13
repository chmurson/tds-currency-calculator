import type { FC } from 'react';
import { CurrencyConversionText, SingleCurrencyInput } from './components';

import { useCurrencyCalculatorState } from './use-currency-calculator-state';

export const CurrencyCalculator: FC = () => {
  const { defaultCurrencies } = useDefaultCurrencies();

  const { onChangeValue1, onChangeValue2, value1, value2 } = useCurrencyCalculatorState({
    defaultCurrencies,
  });

  return (
    <div className="flex gap-4 flex-col items-start">
      <CurrencyConversionText value1={value1} value2={value2} />
      <div className="flex flex-col gap-0.5 w-full">
        <SingleCurrencyInput value={value1} onChange={onChangeValue1} autoFocus />
        <SingleCurrencyInput value={value2} onChange={onChangeValue2} />
      </div>
    </div>
  );
};

function useDefaultCurrencies() {
  // this function could provide default based on user region in the browser settings (or IP)
  return { defaultCurrencies: ['PLN', 'EUR'] as [string, string] };
}
