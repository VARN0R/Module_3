function sumMul(n, m) {
  if (m < n || n < 1 || m < 1) {
    return "INVALID";
  }
  let cur = 0;
  let sum = 0;
  while (cur < m) {
    sum += cur;
    cur += n;
  }
  return sum;
}
