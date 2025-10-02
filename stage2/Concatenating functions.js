Function.prototype.pipe = function (fn) {
  let original = this;
  return function (x) {
    return fn(original(x));
  };
};
