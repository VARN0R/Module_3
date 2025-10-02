Function.prototype.bind = function (rootContext) {
  return (childContext = rootContext) => this.call(childContext, childContext);
};
