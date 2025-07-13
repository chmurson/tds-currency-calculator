export const areNumbersClose = (number1: number, number2: number, precisionDigits: number = 4) => {
  const difference = Math.abs(number2 - number1);
  const areClose = difference < 10 ** -precisionDigits;

  return areClose;
};
