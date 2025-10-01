function* generator(a) {
  let c = 0;
  let b = 1;

  while (true) {
    c = a * b;
    yield `${a} x ${b} = ${c}`;
    b++;
  }
}
