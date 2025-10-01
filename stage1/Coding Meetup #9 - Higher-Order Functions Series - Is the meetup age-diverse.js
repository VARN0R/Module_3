function isAgeDiverse(list) {
  const ageGroups = [
    [10, 19],
    [20, 29],
    [30, 39],
    [40, 49],
    [50, 59],
    [60, 69],
    [70, 79],
    [80, 89],
    [90, 99],
    [100, Infinity],
  ];

  return ageGroups.every(([min, max]) =>
    list.some((dev) => dev.age >= min && dev.age <= max)
  );
}
