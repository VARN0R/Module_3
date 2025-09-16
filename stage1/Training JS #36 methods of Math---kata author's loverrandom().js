function rndCode() {
  const letters = "ABCDEFGHIJKLM";
  const numbers = "0123456789";
  const symbols = "~!@#$%^&*";

  function pick(arr, length) {
    let result = "";
    for (let i = 0; i < length; i++) {
      let idx = Math.floor(Math.random() * arr.length);
      result += arr[idx];
    }
    return result;
  }

  return pick(letters, 2) + pick(numbers, 4) + pick(symbols, 2);
}
