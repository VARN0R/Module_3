Array.prototype.reduce = function (callback, initial) {
  let acc;
  let start = 0;

  if (initial == undefined) {
    acc = this[0];
    start = 1;
  } else {
    acc = initial;
  }

  for (let i = start; i < this.length; i++) {
    acc = callback(acc, this[i]);
  }

  return acc;
};
