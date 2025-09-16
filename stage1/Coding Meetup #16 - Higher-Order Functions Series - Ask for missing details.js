function askForMissingDetails(list) {
  return list
    .filter((dev) => Object.values(dev).some((value) => value === null))
    .map((dev) => {
      const missingKey = Object.keys(dev).find((key) => dev[key] === null);
      return {
        ...dev,
        question: `Hi, could you please provide your ${missingKey}.`,
      };
    });
}
