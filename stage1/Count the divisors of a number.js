function getDivisorsCnt(n) {
  let count = 0;
  let sqrt = Math.floor(Math.sqrt(n));

  for (let i = 1; i <= sqrt; i++) {
    if (n % i === 0) {
      if (i === n / i) {
        count += 1;
      } else {
        count += 2;
      }
    }
  }

  return count;
}
