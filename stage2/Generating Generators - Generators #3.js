function* multiplicationGenerator(a, limit = 10) {
  for (let b = 1; b <= limit; b++) {
    yield `${a} x ${b} = ${a * b}`;
  }
}

function* generator(start, end) {
  for (let i = start; i <= end; i++) {
    yield multiplicationGenerator(i);
  }
}
