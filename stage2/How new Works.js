const myObj = (function () {
  const obj = {};
  obj.__proto__ = MyObject.prototype;
  MyObject.call(obj);
  return obj;
})();
