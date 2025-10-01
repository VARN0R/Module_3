function Plugboard(wires = "") {
  if (wires.length % 2 !== 0) {
    throw new Error("Invalid wire configuration");
  }

  if (wires.length > 20) {
    throw new Error("Too many wires defined");
  }

  const letters = wires.split("");
  const set = new Set(letters);

  if (set.size !== letters.length) {
    throw new Error("Duplicate letters not allowed");
  }

  if (!letters.every((c) => c >= "A" && c <= "Z")) {
    throw new Error("Invalid characters, must be A-Z");
  }

  const map = {};
  for (let i = 0; i < wires.length; i += 2) {
    const a = wires[i];
    const b = wires[i + 1];
    map[a] = b;
    map[b] = a;
  }

  this.process = function (char) {
    if (char >= "A" && char <= "Z") {
      return map[char] || char;
    }
    return char;
  };
}
