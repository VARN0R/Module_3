function colorOf(r, g, b) {
  function toHex(n) {
    return n.toString(16).padStart(2, "0");
  }
  return "#" + toHex(r) + toHex(g) + toHex(b);
}
