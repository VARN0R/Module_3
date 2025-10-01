Function.prototype.call = function (thisArg, ...args) {
  return this.apply(thisArg, args);
};
