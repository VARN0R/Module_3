var summation = function (num) {
  let cur = 1;
  let res = 0;
  while (cur <= num) {
    res += cur;
    cur++;
  }
  return res;
};
