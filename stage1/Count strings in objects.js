function strCount(obj) {
  let count = 0;

  function helper(value) {
    if (typeof value === "string") {
      count++;
    } else if (Array.isArray(value)) {
      value.forEach(helper);
    } else if (value && typeof value === "object") {
      Object.values(value).forEach(helper);
    }
  }

  helper(obj);
  return count;
}
