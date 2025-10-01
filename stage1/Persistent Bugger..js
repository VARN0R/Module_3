function persistence(num) {
  let stringFromNum = String(num);
  let cur = Number(stringFromNum[0]);
  let counter = 0;

  if (stringFromNum.length === 1) {
    return 0;
  }

  while (stringFromNum.length !== 1) {
    for (let i = 1; i < stringFromNum.length; i++) {
      cur *= Number(stringFromNum[i]);
    }
    counter++;
    stringFromNum = String(cur);
    cur = Number(stringFromNum[0]);
  }

  return counter;
}
