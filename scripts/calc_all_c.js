// (1<a<10) + (b=x) = ?

const fixedNumbers = [5, 9]; // add or change fixed numbers here

function generateGroup(x) {
  const calculations = [];
  for (let a = 2; a <= 9; a++) {
    calculations.push({ expression: `${a} + ${x}`, result: a + x });
  }
  // shuffle within group
  for (let i = calculations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [calculations[i], calculations[j]] = [calculations[j], calculations[i]];
  }
  return calculations;
}

for (const x of fixedNumbers) {
  const group = generateGroup(x);
  console.log(`--- b = ${x} (${group.length} combinations) ---`);
  group.forEach(({ expression, result }) => {
    console.log(`${expression} = ${result}`);
  });
}
