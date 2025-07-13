# Currency Calculator

This is Currency Calculator prepared for recruitment

## Assumptions

- The Currency Calculator is heavily inspired by Google's currency calculator
- API for the conversion and currencies is taken from [https://currencybeacon.com](https://currencybeacon.com)
- The conversion can be done in two directions: from `intial value` to `final value` and in reverse - from `final value` to `initial value`
- Conversion is always done via API, to ensure maxium accuracy of final result
  - local conversion done via base rate is more prone to errors when large numbers are taken into account; for small there is no differnce
- The task's execution is limited to ~2 hours therefore some simplifications where taken
  - styling is minmal; but it looks okay on desktop and mobile
  - there are no visual loading indicator when async calls takes more time than expected (e.g. slow mobile network)
  - for simplicity currency formartting is hanled in two ways:
    - in input, there both `,` and `.` are treated as decimal separator; to make decimal input effortless
    - in text, local browser settings are used, taken via Intl.NumberFormat(navigator.language, ...) to create correctly formatted number
  - There is no "swap" button - to swap two currencies - i've already exceeded given task time
  - There is no search input integrated with select element to make finding specific currency easier
  - There is no cache modifications, it's all default settings from SWR; in general list of currencies could have set longterm TTL (at least few days) as it changes rarely; currency conversion could be cached as well - TTL less than a day;

## Technology

- SWR
- Tailwindcss
- Vite + React + Typescript

## Setup

### Installation

```
npm ci
```

### Env Setup

```
cp .env.example .env.local
```

Modify `.env.local` values:
- `VITE_CURRENCYBEACON_API_KEY` set to API KEY from [https://currencybeacon.com](https://currencybeacon.com)

## Development

### Start dev server
```
npm run dev
```

### Fix formatting and linting issues

```
npm run biome
```
