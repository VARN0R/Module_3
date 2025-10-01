Object.deepFreeze = function (object) {
  Object.freeze(object);
  for (const key in object) Object.deepFreeze(object[key]);
};
