// (a>1) + (b>1) = (c<=20)

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const addendMin = 2;
const resultMax = 20;

function generateAdditionCalculations(count = 10) {
  const seen = new Set();
  const calculations = [];
  while (calculations.length < count) {
    const a = randomInt(addendMin, resultMax - addendMin - 1);
    const b = randomInt(addendMin, resultMax - a);
    const key = `${a}+${b}`;
    if (!seen.has(key)) {
      seen.add(key);
      calculations.push({ expression: `${a} + ${b}`, result: a + b });
    }
  }
  return calculations;
}

const calculations = generateAdditionCalculations(50);
calculations.forEach(({ expression, result }) => {
  console.log(`${expression} = ${result}`);
});
