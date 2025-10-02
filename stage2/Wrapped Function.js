if (!Function.prototype.wrap) {
  Function.prototype.wrap = function (wrapper) {
    const original = this;
    return function (...args) {
      return wrapper.call(this, original.bind(this), ...args);
    };
  };
}
