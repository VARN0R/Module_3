function cutIt(arr) {
  let short = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].length < short.length) {
      short = arr[i];
    }
  }

  return arr.map((item) => item.substring(0, short.length));
}
