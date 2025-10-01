const countSheep = function (num) {
  if (num === 0) {
    return "";
  }
  let res = "";
  let string = "sheep...";
  for (let i = 1; i <= num; i++) {
    res += `${i} ${string}`;
  }
  return res;
};
