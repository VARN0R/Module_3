function mirrorImage(arr) {
  let result = [-1, -1];

  arr.some((num, i) => {
    if (i < arr.length - 1) {
      const str1 = num.toString();
      const str2 = arr[i + 1].toString();
      if (
        str1.length === str2.length &&
        str1.split("").every((ch, idx) => ch === str2[str2.length - 1 - idx])
      ) {
        result = [num, arr[i + 1]];
        return true;
      }
    }
    return false;
  });

  return result;
}
