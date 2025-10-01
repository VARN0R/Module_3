function blackAndWhite(arr) {
  return !Array.isArray(arr)
    ? "It's a fake array"
    : arr.indexOf(5) !== -1 && arr.indexOf(13) !== -1
    ? "It's a black array"
    : "It's a white array";
}
