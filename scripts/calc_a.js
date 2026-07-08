// (a<10)+b?=(c<20)

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const resultMax = 20;

function generateAdditionCalculations(count = 10) {
  const seen = new Set();
  const calculations = [];
  while (calculations.length < count) {
    e
    const a = randomInt(2, 9);
    const b = randomInt(10 - a, resultMax - a);
    const key = `${a}+${b}`;
    if (!seen.has(key)) {
      seen.add(key);
      calculations.push({ expression: `${a} + ${b}`, result: a + b });
    }
  }
  return calculations;
}

const calculations = generateAdditionCalculations(10);
calculations.forEach(({ expression, result }) => {
  console.log(`${expression} = ${result}`);
});
