// (1<a<10) + (b=x) = ?

const fixedNumber = 2; // change this to any fixed number

function generateAdditionCalculations() {
  const calculations = [];
  for (let a = 2; a <= 9; a++) {
    calculations.push({ expression: `${a} + ${fixedNumber}`, result: a + fixedNumber });
  }
  // shuffle
  for (let i = calculations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [calculations[i], calculations[j]] = [calculations[j], calculations[i]];
  }
  return calculations;
}

const calculations = generateAdditionCalculations();
calculations.forEach(({ expression, result }) => {
  console.log(`${expression} = ${result}`);
});
