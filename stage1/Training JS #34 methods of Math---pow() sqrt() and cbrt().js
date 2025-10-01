function cutCube(volume, n) {
  let big = Math.cbrt(volume);
  let small = Math.cbrt(volume / n);

  return Number.isInteger(big) && Number.isInteger(small);
}
