function findSimilarity(str, word) {
  return str
    .split(" ")
    .filter(
      (w) =>
        w.length === word.length &&
        w[0] === word[0] &&
        w[w.length - 1] === word[word.length - 1]
    )
    .join(" ");
}
