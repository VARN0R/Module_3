const shuffleIt = (arr, ...swaps) => {
  let result = [...arr];

  swaps.forEach(([i, j]) => {
    [result[i], result[j]] = [result[j], result[i]];
  });

  return result;
};
