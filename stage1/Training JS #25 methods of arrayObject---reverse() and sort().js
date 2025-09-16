function sortIt(arr) {
  const freq = {};
  for (const num of arr) {
    freq[num] = (freq[num] || 0) + 1;
  }

  const result = [...arr];

  result.sort((a, b) => {
    if (freq[a] === freq[b]) {
      return b - a;
    } else {
      return freq[a] - freq[b];
    }
  });

  return result;
}
