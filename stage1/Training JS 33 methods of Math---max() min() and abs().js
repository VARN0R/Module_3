function maxMin(arr1, arr2) {
  let diffs = arr1.map((num, i) => Math.abs(num - arr2[i]));
  let max = Math.max(...diffs);
  let min = Math.min(...diffs);

  return [max, min];
}
