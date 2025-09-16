function tailAndHead(arr) {
  const sums = arr.slice(0, -1).map((num, i) => {
    const tail = num % 10;
    const head = parseInt(arr[i + 1].toString()[0]);
    return tail + head;
  });

  return sums.reduce((prod, val) => prod * val, 1);
}
