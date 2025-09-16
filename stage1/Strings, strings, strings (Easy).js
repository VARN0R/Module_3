Number.prototype.toString = function () {
  return "" + this.valueOf();
};

Boolean.prototype.toString = function () {
  return this.valueOf() ? "true" : "false";
};

Array.prototype.toString = function () {
  return "[" + this.map((v) => "" + v).join(", ") + "]";
};
