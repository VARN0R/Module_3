function roundIt(n) {
  const arr = String(n).split(".");

  if (arr[0].length < arr[1].length) {
    return Math.ceil(n);
  } else if (arr[0].length > arr[1].length) {
    return Math.floor(n);
  } else {
    return Math.round(n);
  }
}
