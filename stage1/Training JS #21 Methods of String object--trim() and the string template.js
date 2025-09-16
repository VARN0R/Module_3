function fiveLine(s) {
  s = s.trim();

  let result = "";
  for (let i = 1; i <= 5; i++) {
    result += `${s.repeat(i)}`;
    if (i < 5) {
      result += "\n";
    }
  }

  return result;
}
