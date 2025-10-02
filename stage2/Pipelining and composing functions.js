function pipeline(seed, ...fns) {
  return fns.reduce((acc, fn) => fn(acc), seed);
}

function compose(...fns) {
  return function (seed) {
    return fns.reduceRight((acc, fn) => fn(acc), seed);
  };
}
