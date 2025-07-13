import {
  type ChangeEventHandler,
  type FC,
  type FocusEventHandler,
  type KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useAllCurrencies } from "../../api";
import { areNumbersClose } from "../../utils/are-numbers-close";
import type { CurrencyValue } from "../types";

export const SingleCurrencyInput: FC<{
  value: CurrencyValue;
  onChange: (value: CurrencyValue) => void;
  autoFocus?: boolean;
}> = ({ value, onChange, autoFocus = false }) => {
  const { sortedData } = useSortedCurrencies();

  const matchedCurrencyItem = useMemo(() => {
    return sortedData
      ? sortedData.find((item) => item.short_code === value.currencyShortChode)
      : undefined;
  }, [sortedData, value.currencyShortChode]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current || !matchedCurrencyItem) {
      return;
    }

    inputRef.current.value = value.amount.toFixed(matchedCurrencyItem.precision);
  }, [value, matchedCurrencyItem]);

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    const newPrasedValue = uxFriendlyParseFloat(e.currentTarget.value);
    if (areNumbersClose(newPrasedValue, value.amount, matchedCurrencyItem?.precision)) {
      return;
    }
    ensureInputValueIsValid(e);
    onChange({
      amount: newPrasedValue,
      currencyShortChode: value.currencyShortChode,
    });
  };

  const handleOnKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== "Enter") {
      return;
    }

    const newPrasedValue = uxFriendlyParseFloat(e.currentTarget.value);

    if (areNumbersClose(newPrasedValue, value.amount, matchedCurrencyItem?.precision)) {
      return;
    }

    ensureInputValueIsValid(e);
    onChange({
      amount: newPrasedValue,
      currencyShortChode: value.currencyShortChode,
    });
  };

  const handleOnSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange({ amount: value.amount, currencyShortChode: e.target.value });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="border px-1 py-1 flex max-w-fit">
      <input
        className="py-1 focus:outline-0 px-2 min-w-28"
        type="text"
        inputMode="numeric"
        pattern="[0-9,.]*"
        onBlur={handleBlur}
        ref={inputRef}
        onKeyDown={handleOnKeyDown}
        autoFocus={autoFocus}
      />
      <span className="text-2xl opacity-50">|</span>
      <select
        value={value.currencyShortChode}
        onChange={handleOnSelectChange}
        className="text-right pr-1 focus:outline-0 focus:bg-[var(--lighter-bg-color)] py-2  px-2 max-sm:text-sm"
      >
        {(sortedData ?? []).map((currency) => (
          <option key={currency.id} value={currency.short_code}>
            {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
};

function uxFriendlyParseFloat(hopefullyNumber: string) {
  return parseFloat(hopefullyNumber.replace(",", "."));
}

const ensureInputValueIsValid = (e: { currentTarget: { value: string } }) => {
  const inputValue = e.currentTarget.value;
  const parsedValue = uxFriendlyParseFloat(inputValue).toString();
  if (parsedValue !== inputValue.trim()) {
    e.currentTarget.value = parsedValue;
  }
};

const useSortedCurrencies = () => {
  const { data, isLoading, error } = useAllCurrencies();

  const sortedData = useMemo(() => {
    if (!data) {
      return data;
    }
    return data.sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  return { data, sortedData, isLoading, error };
};
