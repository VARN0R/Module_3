function nouveau(Constructor, ...args) {
  const instance = Object.create(Constructor.prototype);

  const result = Constructor.apply(instance, args);

  if (
    result !== null &&
    (typeof result === "object" || typeof result === "function")
  ) {
    return result;
  }
  return instance;
}
