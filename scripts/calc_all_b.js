// (a>10) + (b?) = (c<=20)
// max number of combinations: 45

const resultMax = 20;

function generateAllAdditionCalculations() {
  const calculations = [];
  for (let a = 11; a <= 19; a++) {
    for (let b = 1; b <= resultMax - a; b++) {
      calculations.push({ expression: `${a} + ${b}`, result: a + b });
    }
  }
  // shuffle
  for (let i = calculations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [calculations[i], calculations[j]] = [calculations[j], calculations[i]];
  }
  return calculations;
}

const calculations = generateAllAdditionCalculations();
console.log(`Total: ${calculations.length} combinations`);
calculations.forEach(({ expression, result }) => {
  console.log(`${expression} = ${result}`);
});
