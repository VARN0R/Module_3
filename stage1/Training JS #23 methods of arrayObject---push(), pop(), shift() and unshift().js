function infiniteLoop(arr, d, n) {
  let flat = [];
  for (let sub of arr) {
    for (let item of sub) {
      flat.push(item);
    }
  }

  let totalLen = flat.length;
  n = n % totalLen;

  if (d === "left") {
    flat = flat.slice(n).concat(flat.slice(0, n));
  } else if (d === "right") {
    flat = flat.slice(-n).concat(flat.slice(0, -n));
  }

  let result = [];
  let idx = 0;
  for (let sub of arr) {
    result.push(flat.slice(idx, idx + sub.length));
    idx += sub.length;
  }

  return result;
}
