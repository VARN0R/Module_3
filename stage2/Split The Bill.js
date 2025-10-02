function splitTheBill(x) {
  const names = Object.keys(x);
  const total = Object.values(x).reduce((sum, val) => sum + val, 0);
  const avg = total / names.length;

  const result = {};
  names.forEach((name) => {
    result[name] = Math.round((x[name] - avg) * 100) / 100;
  });

  return result;
}
