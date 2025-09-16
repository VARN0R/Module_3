function getCount(input) {
  if (typeof input !== "string") return { vowels: 0, consonants: 0 };

  const str = input.toLowerCase();

  const vowelsSet = new Set(["a", "e", "i", "o", "u"]);

  let vowels = 0;
  let consonants = 0;

  for (let char of str) {
    if (char >= "a" && char <= "z") {
      if (vowelsSet.has(char)) {
        vowels++;
      } else {
        consonants++;
      }
    }
  }

  return { vowels, consonants };
}
