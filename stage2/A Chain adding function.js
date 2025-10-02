function add(n) {
  function inner(x) {
    return add(n + x);
  }

  inner.valueOf = function () {
    return n;
  };

  return inner;
}
