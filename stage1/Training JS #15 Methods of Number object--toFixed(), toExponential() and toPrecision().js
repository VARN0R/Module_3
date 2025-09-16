function howManySmaller(arr, n) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    let fixed = Number(arr[i].toFixed(2));
    if (fixed < n) {
      count++;
    }
  }

  return count;
}
