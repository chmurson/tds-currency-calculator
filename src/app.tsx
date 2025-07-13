import { CurrencyCalculator } from "./currency-calculator/currency-calculator";

function App() {
  return (
    <div className="mx-auto max-w-3xl w-full px-4 py-12">
      <div className="flex flex-col gap-4">
        <h1>Currency Calculator</h1>
        <CurrencyCalculator />
      </div>
    </div>
  );
}

export default App;
