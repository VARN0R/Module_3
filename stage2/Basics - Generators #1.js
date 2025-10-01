function* generator() {
  let count = 1;
  while (true) {
    const newVal = yield count;
    if (typeof newVal === "number") {
      count = newVal;
    } else {
      count++;
    }
  }
}
